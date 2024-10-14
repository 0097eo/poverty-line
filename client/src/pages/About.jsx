import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
      <div className="bg-white text-black">
        {/* About Section */}
        <section className="bg-black text-white rounded-b-3xl relative overflow-hidden text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-8">About Us</h1>
            <p className="text-lg mb-6">
              While global poverty rates have been cut by more than half since 2000, one in ten people in developing regions still live on less than Ksh 190 a day—the internationally agreed poverty line. Millions more live slightly above this daily amount, and 42% of the population in Sub-Saharan Africa continues to live below the poverty line.
            </p>
            <p className="text-lg mb-6">
              Poverty entails more than the lack of income and productive resources to ensure sustainable livelihoods. Its effects are widespread, manifesting in hunger, malnutrition, limited access to education and essential services, social discrimination, and exclusion from decision-making. In 2015, over 736 million people lived below the international poverty line.
            </p>
            <p className="text-lg">
              Today, around 10% of the world's population lives in extreme poverty, struggling to meet their most basic needs—health, education, water, and sanitation. Poverty disproportionately affects women and children, with 122 women aged 25-34 living in poverty for every 100 men in the same age group. By 2030, more than 160 million children are at risk of continuing to live in extreme poverty.
            </p>
          </div>
        </section>
  
        {/* Solution Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Solution</h2>
          <p className="text-lg mb-6">
            <span className="font-bold">Blah Company</span> identified three core issues that we aim to address: poverty eradication, employment generation, and social integration. We are committed to contributing to the creation of a global community that fosters secure, just, free, and harmonious societies that provide opportunities and higher living standards for all.
          </p>
          <p className="text-lg">
            Through our classification system and collaborative initiatives, we work towards poverty eradication by creating sustainable employment opportunities, fostering social integration, and empowering marginalized groups to participate in society. Our mission is to ensure that no one is left behind as we build a more inclusive and prosperous world for all.
          </p>
        </section>
  
        {/* Impact Stats Section */}
        <section className="bg-purple-600 text-white py-20 rounded-3xl mx-4">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Making a Difference</h2>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="text-4xl font-bold">20k+</p>
                <p>Volunteers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">30+</p>
                <p>Countries</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">25M</p>
                <p>People Impacted</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Call to Action Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Join Us in Making a Difference</h2>
          <Link to='/signup'>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300">
              Become a Volunteer
            </button>
          </Link>
        </section>
        {/* Footer */}
        <footer className="bg-black text-white py-10 rounded-t-3xl">
          <div className="container mx-auto px-4">
            <p className="text-center mb-4">Let's come be part of the changes</p>
            <div className="flex justify-center space-x-4 mb-4">
              <a href="#" className="text-purple-400 hover:text-purple-300">Facebook</a>
              <a href="#" className="text-purple-400 hover:text-purple-300">Twitter</a>
              <a href="#" className="text-purple-400 hover:text-purple-300">Instagram</a>
              <a href="#" className="text-purple-400 hover:text-purple-300">LinkedIn</a>
            </div>
            <p className="text-center text-sm">© 2024 PovertyLine. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  };
  
  export default AboutPage;
  