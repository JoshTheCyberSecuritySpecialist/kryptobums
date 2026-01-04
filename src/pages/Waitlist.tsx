import { useState } from 'react';
import { Section } from '../components/UI/Section';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { submitToWaitlist } from '../services/hubspot';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [alias, setAlias] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await submitToWaitlist({
        email,
        alias: alias || undefined,
      });

      setStatus('success');
      setMessage(response.message);
      setEmail('');
      setAlias('');
    } catch (error) {
      setStatus('error');
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
      console.error('Waitlist submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section
      title="Join the Waitlist"
      subtitle="Be among the first to enter the arena"
    >
      <div className="max-w-xl mx-auto">
        <Card accentColor="green">
          <div className="space-y-6">
            <p className="text-[#E5E7EB] text-lg leading-relaxed text-center">
              Get early access to Card Clash, exclusive character drops, and underground intel
              before anyone else. The arena is calling.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-[#E5E7EB] font-bold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-[#1A1C20] border-2 border-[#2D3139] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#00FF9C] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="alias" className="block text-[#E5E7EB] font-bold mb-2">
                  Fighter Alias (Optional)
                </label>
                <input
                  type="text"
                  id="alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="What should we call you?"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-[#1A1C20] border-2 border-[#2D3139] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#00FF9C] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || !email}
                className="w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join the Underground'
                )}
              </Button>
            </form>

            {status === 'success' && (
              <div className="flex items-start gap-3 p-4 bg-[#00FF9C]/10 border-2 border-[#00FF9C] rounded-lg">
                <CheckCircle className="w-6 h-6 text-[#00FF9C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#00FF9C] font-bold mb-1">Success!</p>
                  <p className="text-[#E5E7EB]">{message}</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-start gap-3 p-4 bg-[#FF3B3B]/10 border-2 border-[#FF3B3B] rounded-lg">
                <XCircle className="w-6 h-6 text-[#FF3B3B] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#FF3B3B] font-bold mb-1">Error</p>
                  <p className="text-[#E5E7EB]">{message}</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#2D3139]">
              <p className="text-[#9CA3AF] text-sm text-center leading-relaxed">
                By joining, you'll receive exclusive updates about Card Clash, early access
                opportunities, and insider info about the KryptoBums universe.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};
