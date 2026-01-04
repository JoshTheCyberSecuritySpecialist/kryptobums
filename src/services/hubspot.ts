interface WaitlistSubmission {
  email: string;
  alias?: string;
}

interface WaitlistResponse {
  success: boolean;
  message: string;
  duplicate?: boolean;
  contactId?: string;
  error?: string;
}

export const submitToWaitlist = async (
  data: WaitlistSubmission
): Promise<WaitlistResponse> => {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/hubspot-waitlist`;

  const headers = {
    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok && !result.success) {
    throw new Error(result.error || 'Failed to submit to waitlist');
  }

  return result;
};
