import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bell, FileText, History, Plus, PlusCircle } from "lucide-react";
import Image from "next/image";

const Dashboard = () => {
    const recentItems = [
    { title: "Legal Insights on Maritime Dispute", type: "Recents" },
    { title: "Legal Insights on Maritime Dispute", type: "Recents" },
    { title: "Analyse changes of provisions for acquisition", type: "Recents" },
  ];

  return (
    <div className="px-2">
      <div className="flex justify-between mt-[26px] py-2 max-w-[970px] mx-auto ">
        <Image
          src="/assets/logo2.svg"
          alt="Dashboard Logo"
          width={184}
          height={40}
        />

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <Bell size={20} />
          </button>

          <Button className="w-[175px] py-[10px] bg-[#A684FF] hover:bg-[#9333ea] rounded-[6px] h-full px-6 gap-2">
            <PlusCircle size={18} />
            History
          </Button>
        </div>
      </div>

      <main className="flex flex-col items-center justify-center mt-12 px-4">
        
        <div className="w-full max-w-5xl bg-gray-50 rounded-[32px] p-6 h-[400px] flex flex-col relative group border border-transparent focus-within:border-purple-100 transition-all">
          
          <Textarea
            className="w-full flex-1 bg-transparent resize-none border-none outline-none text-gray-600 placeholder:text-gray-400 text-lg p-2"
            placeholder="Ask Co-Arbitrator for anything"
          />

          <div className="flex items-center justify-between mt-4">
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors font-medium px-2 py-2 rounded-lg hover:bg-gray-100">
              <Plus size={20} />
              <span>File Upload</span>
            </button>

            <Button className="bg-[#a855f7] hover:bg-[#9333ea] rounded-xl px-8 py-6 text-md shadow-lg shadow-purple-200">
              Send Message
            </Button>
          </div>
        </div>

        <div className="w-full max-w-3xl mt-16">
          <h3 className="text-gray-400 font-medium mb-4 text-sm ml-2">
            Recents
          </h3>
          
          <div className="flex flex-col space-y-2">
            {recentItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group border-b border-[#F0F0F0F0]"
              >
                <div className="flex items-center gap-3 text-gray-600 group-hover:text-purple-700">
                  <FileText size={18} className="text-gray-400 group-hover:text-purple-500" />
                  <span className="font-medium text-sm/[35px] md:text-base">
                    {item.title}
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
