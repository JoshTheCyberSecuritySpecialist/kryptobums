import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface WaitlistRequest {
  email: string;
  alias?: string;
}

interface HubSpotResponse {
  id?: string;
  status?: string;
  message?: string;
}

const sendWelcomeEmail = async (email: string, alias?: string) => {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured - skipping email");
    return { success: false, skipped: true };
  }

  const greeting = alias ? alias : "fighter";

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #E5E7EB;
          background-color: #14161A;
          padding: 40px 20px;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #1A1C20;
          border: 2px solid #00FF9C;
          border-radius: 8px;
          padding: 40px;
        }
        .header {
          color: #00FF9C;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 30px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .content {
          color: #E5E7EB;
          font-size: 16px;
          line-height: 1.8;
        }
        .content p {
          margin: 0 0 20px 0;
        }
        .signature {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #2D3139;
          color: #9CA3AF;
          font-size: 14px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #6B7280;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">You Made the List.</div>
        <div class="content">
          <p>Yo,</p>
          <p>Name's Bobby.</p>
          <p>You didn't end up here by accident.<br>
          Nobody finds the underground unless they're supposed to.</p>
          <p>You're on the list now.<br>
          That means early access.<br>
          That means first fights.<br>
          That means when things get wild, you're already inside.</p>
          <p>No promises.<br>
          No hand-holding.<br>
          Just opportunity.</p>
          <p>When it's time, you'll hear from us.</p>
          <p>Until then —<br>
          Stay sharp.<br>
          Stay ready.</p>
        </div>
        <div class="signature">
          <strong>— Bobby</strong><br>
          KryptoBums
        </div>
        <div class="footer">
          You're receiving this because you joined the KryptoBums waitlist.
        </div>
      </div>
    </body>
    </html>
  `;

  const textBody = `
Yo,

Name's Bobby.

You didn't end up here by accident.
Nobody finds the underground unless they're supposed to.

You're on the list now.
That means early access.
That means first fights.
That means when things get wild, you're already inside.

No promises.
No hand-holding.
Just opportunity.

When it's time, you'll hear from us.

Until then —
Stay sharp.
Stay ready.

— Bobby
KryptoBums
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "KryptoBums Underground <no-reply@kryptobums.game>",
        to: [email],
        subject: "You Made the List.",
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return { success: false, error: errorData };
    }

    const result = await response.json();
    return { success: true, emailId: result.id };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { email, alias }: WaitlistRequest = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase configuration missing");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let isNewSignup = true;

    const { data: existingSignup, error: checkError } = await supabase
      .from("waitlist_signups")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existingSignup) {
      isNewSignup = false;
      console.log(`Email already exists in database: ${email}`);
    } else {
      const { error: insertError } = await supabase
        .from("waitlist_signups")
        .insert({
          email,
          alias: alias || null,
          source: "kryptobums",
        });

      if (insertError) {
        console.error("Database insert error:", insertError);
        if (insertError.code !== "23505") {
          return new Response(
            JSON.stringify({ error: "Failed to save signup" }),
            {
              status: 500,
              headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
              },
            }
          );
        }
        isNewSignup = false;
      }
    }

    const hubspotApiKey = Deno.env.get("HUBSPOT_API_KEY");
    let hubspotSuccess = false;

    if (hubspotApiKey) {
      const hubspotPayload = {
        properties: {
          email: email,
          ...(alias && { firstname: alias }),
          waitlist_source: "kryptobums",
          signup_page: "waitlist",
        },
      };

      try {
        const hubspotResponse = await fetch(
          "https://api.hubapi.com/crm/v3/objects/contacts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${hubspotApiKey}`,
            },
            body: JSON.stringify(hubspotPayload),
          }
        );

        if (hubspotResponse.ok || hubspotResponse.status === 409) {
          hubspotSuccess = true;
        } else {
          const errorData = await hubspotResponse.json();
          console.error("HubSpot API error:", errorData);
        }
      } catch (error) {
        console.error("HubSpot request failed:", error);
      }
    } else {
      console.warn("HUBSPOT_API_KEY not configured - skipping HubSpot sync");
    }

    let emailSent = false;
    if (isNewSignup) {
      const emailResult = await sendWelcomeEmail(email, alias);
      emailSent = emailResult.success;
      if (!emailResult.success && !emailResult.skipped) {
        console.error("Failed to send welcome email, but continuing...");
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: isNewSignup 
          ? "You're in. The underground remembers."
          : "You're already on the list. We'll be in touch.",
        isNewSignup,
        emailSent,
        hubspotSynced: hubspotSuccess,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});