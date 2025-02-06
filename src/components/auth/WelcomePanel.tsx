interface LogoProps {
  className: string;
}

const Logo = ({ className }: LogoProps) => (
  <img 
    src="/lovable-uploads/85ddb6a9-a7f3-4b74-a4b3-867d490e6043.png" 
    alt="SNBS Logo" 
    className={className}
  />
);

export const WelcomePanel = () => (
  <div className="hidden lg:flex lg:w-1/2 bg-[#1850E5] text-white p-12 flex-col justify-between">
    <div className="flex flex-col justify-center h-full">
      <div className="flex justify-center mb-12">
        <Logo className="w-40 h-40 object-contain" />
      </div>
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">
          Hay'adda Istaatistikada Qaranka Soomaaliya
          <br />
          <span className="text-2xl mt-2 block">
            Somali National Bureau of Statistics
          </span>
        </h1>
        <p className="text-lg opacity-90 mt-4">
          Centralized platform for managing and analyzing statistical data for
          informed decision-making.
        </p>
      </div>
    </div>
  </div>
);

export default WelcomePanel;