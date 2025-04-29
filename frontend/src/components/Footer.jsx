const Footer = () => {
    return (
      <footer className="bg-zinc-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Branding */}
          <div>
            <h2 className="text-yellow-400 text-2xl font-bold mb-2">🎬 BeeWatch</h2>
            <p className="text-sm text-zinc-400">
              Discover trending movies and TV shows. Built with ❤️ by passionate movie lovers.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/movies" className="hover:text-yellow-400 transition">Movies</a></li>
              <li><a href="/tv" className="hover:text-yellow-400 transition">TV Shows</a></li>
              <li><a href="/about" className="hover:text-yellow-400 transition">About</a></li>
            </ul>
          </div>
  
          {/* Social Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-yellow-400 transition">🐙 GitHub</a>
              <a href="#" className="hover:text-yellow-400 transition">📘 Facebook</a>
              <a href="#" className="hover:text-yellow-400 transition">📺 YouTube</a>
              <a href="#" className="hover:text-yellow-400 transition">🔗 LinkedIn</a>
            </div>
          </div>
        </div>
  
       
  
        {/* Bottom line */}
        <div className="border-t border-zinc-700 mt-8 pt-4 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} BeeWatch. All rights reserved.
          <p className="mt-2">Built by the <span className="font-bold text-yellow-400">BeeWatch Team</span></p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  