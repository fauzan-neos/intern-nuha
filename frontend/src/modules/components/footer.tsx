export default function Footer() {
    return (
    <footer className="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-10 py-16">
      
      {/* TOP */}
      <div className="grid md:grid-cols-3 gap-10">
        
        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-bold mb-4">MedCare</h1>

          <h2 className="text-xl font-semibold mb-4">
            Expert Care for Your Family
          </h2>

          
        </div>

        {/* MIDDLE */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            HELP AND SOLUTION
          </h3>

          <p className="text-sm text-white/80 cursor-pointer hover:underline">
            Talk to Support
          </p>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            LOCATION
          </h3>

          <ul className="space-y-2 text-sm text-white/80">
            <li>Tanggerang City</li>
          </ul>
        </div>
      </div>

      {/* LINE */}
      <div className="border-t border-white/20 my-10"></div>

      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80 gap-4">
        
        <p>© 2026 MedCare. All rights reserved.</p>

      </div>
    </footer>
  );
}