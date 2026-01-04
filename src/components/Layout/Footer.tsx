import logo from '../../assets/kryptobumslogo.png';

export const Footer = () => {
  return (
    <footer className="bg-[#0B0D10] border-t-2 border-[#00FF9C] mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center">
            <img
              src={logo}
              alt="KryptoBums Logo"
              className="h-10 w-auto"
            />
          </div>

          <p className="text-[#9CA3AF] text-sm text-center">
            Street legends rise. The arena awaits.
          </p>

          <p className="text-[#9CA3AF] text-sm">
            © 2025 KryptoBums. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
