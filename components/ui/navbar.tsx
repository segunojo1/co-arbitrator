import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between fixed w-full py-7 px-10 z-[999]">
      <ul className="flex items-center text-[14px]/[20px] -tracking-[0.5px] font-normal text-[#FFFFFFB2]">
        <li className="mr-3">
          <Image src="/assets/logo.png" alt="Logo" width={135} height={26} />
        </li>
        <li className="pt-[9.5px] pr-[11.3px] pb-[10.5px] pl-[12px] mr-1" >Features</li>
        <li className="pt-[9.5px] pr-[11.3px] pb-[10.5px] pl-[12px]" >Resources</li>
      </ul>

      <div className="gap-[14px] flex items-center ">
        <button className="text-[14px]/[20px] -tracking-[0.5px] font-normal pt-[9.5px] pr-[8.38px] pb-[10.5px] pl-[9.62px] rounded-lg bg-[#FFFFFF5C]">Smart Match Arbitrator</button>
        <button className="text-[14px]/[20px] bg-white text-black font-medium rounded-lg py-[10px] pr-[31.5px] pl-[28.6px]">Sign Up</button> 
      </div>
    </nav>
  );
};

export default Navbar;
