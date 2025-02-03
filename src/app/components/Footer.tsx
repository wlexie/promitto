const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 border-gray-300 flex">
      <div className="container mx-auto flex justify-between items-center text-sm text-gray-500">
        {/* Left Section - Logo */}
        <a
          href="https://tuma.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <div>
            <img src="/tumalogo.png" alt="Tuma Logo" className="h-6" />
          </div>
        </a>

        {/* Center Section - Links */}
        <div className="flex space-x-6">
          <a
            href="https://tuma.com/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Terms & Conditions
          </a>
          <a
            href="https://tuma.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="https://tuma.com/complaints-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Complaints Policy
          </a>
          <a
            href="https://tuma.com/compliance"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Compliance
          </a>
        </div>

        {/* Right Section - Copyright */}
        <div>
          <span className="text-gray-500">Copyright © Tuma 2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
