import React from 'react';
import Navbar from '../components/Navbar'; 
import rabiesVirus from '../assets/rabiesVirus.png';

function PurevaxVaccine() {
  return (
    <>
      <Navbar />
      <hr className="border-t-4 border-gray-300 my-10" />
      <div className="container mx-auto px-4 my-10">
        {/* Blog Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Purevax Rabies Vaccine for Cats
        </h1>

        {/* Blog Content */}
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Rabies is a dangerous disease that can be transmitted to humans and animals. In this article, we’ll explore why the Purevax Rabies Vaccine is essential for keeping your feline healthy and protected from this deadly virus.
        </p>

        <img 
          src={rabiesVirus}
          alt="Rabies Virus" 
          className="w-5/6 h-auto mb-7 justify-items-center px-5 "
        />
        <p className="text-sm text-gray-500 text-center">Illustration of the Rabies virus </p>


        <h2 className="text-2xl font-semibold text-gray-800 mt-8">What is the Purevax Rabies Vaccine?</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The Purevax Rabies Vaccine is a highly effective vaccine designed for cats. It provides immunity against rabies, a virus that is almost always fatal once symptoms appear. Unlike some other vaccines, Purevax is designed to reduce the chances of side effects in sensitive cats.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Why is Rabies Vaccination Important for Cats?</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Rabies is a viral disease that affects the brain and spinal cord of mammals. It can be transmitted through the saliva of infected animals, often via bites or scratches. For cats, the risk of rabies exposure is high if they roam outdoors, making vaccination essential. Even indoor cats may be at risk if they have access to open windows or interact with wild animals.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">The Benefits of Purevax Rabies Vaccine</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Purevax is known for its high safety profile, especially in cats, who may have sensitivities to other rabies vaccines. The vaccine helps protect your cat and provides peace of mind for pet owners. It also plays a key role in reducing the transmission of rabies to humans, as it is one of the few zoonotic diseases.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Is the Vaccine Safe for My Cat?</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The Purevax Rabies Vaccine is considered very safe, with minimal side effects. Your veterinarian can provide guidance on when and how often to administer the vaccine to ensure maximum protection. Most cats experience no side effects, but in rare cases, a mild reaction such as a small lump at the injection site may occur. If you have concerns, always consult your vet before the vaccination.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">How Often Should My Cat Receive the Rabies Vaccine?</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          In general, cats should receive their first rabies vaccination at 12 weeks of age or older. Boosters are then given every 1 to 3 years depending on your vet’s recommendation and the specific vaccine used. It is essential to keep your cat’s vaccination records up to date to ensure their ongoing protection.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Conclusion</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Rabies is a preventable disease, and vaccinating your cat with the Purevax Rabies Vaccine is an essential step in protecting their health. Not only does this vaccine keep your feline safe, but it also helps protect your family and community by preventing the spread of this deadly virus. Consult with your veterinarian to ensure your cat’s vaccinations are up-to-date and provide them with the care they deserve.
        </p>
      </div>
    </>
  );
}

export default PurevaxVaccine;
