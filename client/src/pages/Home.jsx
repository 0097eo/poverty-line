import { Link } from "react-router-dom";
import { Heart, Globe, Users, Hand, DollarSign, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="bg-black text-white rounded-b-3xl relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 z-10">
              <h1 className="text-5xl font-bold mb-4">Let's come<br />Be Part of<br />Changes</h1>
              <Link to='/signup'><button className="bg-purple-600 text-white px-6 py-2 rounded-full">Join Now</button></Link>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1530490125459-847a6d437825?q=80&w=1785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero Image"
              className="absolute top-0 right-0 w-full h-full object-cover object-right-top md:w-1/2"
            />
          </div>
        </div>
      </section>


      {/* More Impact Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-8">More people<br />More Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Impact 1" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
              <p className="text-white text-lg font-semibold">Save the Planet</p>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1542317785-ae7b6fa20f55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Impact 2" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
              <p className="text-white text-lg font-semibold">Help Children</p>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src="https://plus.unsplash.com/premium_photo-1681996629585-88965b0d5c83?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Impact 3" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
              <p className="text-white text-lg font-semibold">Support Elderly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-purple-600 text-white py-20 rounded-3xl mx-4">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Together We Are Strong</h2>
          <div className="flex justify-around">
            <div className="text-center">
              <Heart className="mx-auto mb-2" size={40} />
              <p className="text-4xl font-bold">20k</p>
              <p>Volunteers</p>
            </div>
            <div className="text-center">
              <Globe className="mx-auto mb-2" size={40} />
              <p className="text-4xl font-bold">20+</p>
              <p>Countries</p>
            </div>
            <div className="text-center">
              <Users className="mx-auto mb-2" size={40} />
              <p className="text-4xl font-bold">20M</p>
              <p>People Helped</p>
            </div>
          </div>
        </div>
      </section>
     
      {/*this section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1532498551838-b7a1cfac622e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Group photo" 
              className="w-full rounded-lg" 
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-8">Almost is<br />never enough</h2>
            
            <div className='flex items-center'>
              <div className="bg-purple-600 text-white p-4 rounded-lg mr-4">
                <Hand size={24} />
              </div>
              <div className="ml-4">
                <p className="font-bold">Volunteering</p>
                <p>Join us in making a difference</p>
              </div>
            </div>

            <div className='flex items-center mt-4'>
              <div className="bg-blue-600 text-white p-4 rounded-lg mr-4">
                <DollarSign size={24} />
              </div>
              <div className="ml-4">
                <p className="font-bold">Donations</p>
                <p>Support our cause financially</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/3 p-4">
            <p className="text-2xl italic mb-4">"As we lose ourselves in the service of others, we discover our own happiness."</p>
            <img src="https://images.unsplash.com/photo-1440451185281-11ff5853ce0a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Quote author" className="w-20 h-20 rounded-full mx-auto mb-2" />
            <p className="font-bold">Patrick Matasi</p>
            <p className="text-sm">Volunteer</p>
          </div>
          
          <div className="w-full sm:w-1/3 p-4">
            <p className="text-2xl italic mb-4">"The best way to find yourself is to lose yourself in the service of others."</p>
            <img src="https://images.unsplash.com/photo-1601921004897-b7d582836990?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Quote author" className="w-20 h-20 rounded-full mx-auto mb-2" />
            <p className="font-bold">Mahatma Gandhi</p>
            <p className="text-sm">Activist</p>
          </div>

          <div className="w-full sm:w-1/3 p-4">
            <p className="text-2xl italic mb-4">"Volunteers do not necessarily have the time; they just have the heart."</p>
            <img src="https://images.unsplash.com/photo-1612708474132-9c9b981c016b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Quote author" className="w-20 h-20 rounded-full mx-auto mb-2" />
            <p className="font-bold">Larenz Tate</p>
            <p className="text-sm">Musician</p>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-black text-white py-10 rounded-t-3xl">
        <div className="container mx-auto px-4">
          <p className="text-center mb-4">Let's come be part of the changes</p>
          <div className="flex justify-center space-x-4 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Facebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Twitter /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Instagram /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Linkedin /></a>
          </div>
          <p className="text-center text-sm">© 2024 PovertyLine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;