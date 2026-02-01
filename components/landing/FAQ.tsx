import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs: { question: string; answer: string }[] = [
    {
      question: "What is Co-Arbitrator?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Why does my firm need Co-Arbitrator?",
      answer:
        "Yes — the accordion is unstyled by default so you can apply your own classes and design system.",
    },
     {
      question: "What solutions does Co-Arbitrator have?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Who is Co-Arbitrator built for?",
      answer:
        "Yes — the accordion is unstyled by default so you can apply your own classes and design system.",
    },
    {
      question: "How do I get started?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "What makes Co-Arbitrator unique?",
      answer:
        "Yes — the accordion is unstyled by default so you can apply your own classes and design system.",
    },
    {
      question: "How secure is my data on Co-Arbitrator?",
      answer:
        "Yes — the accordion is unstyled by default so you can apply your own classes and design system.",
    },
  ];
  return (
    <section className="flex flex-col items-start px-[100px] pt-[73px] border-t mt-20 gap-5">
      <h2 className="text-[14px]/[18px] text-[#2563EB] mb-[15px]">
        GOT QUESTIONS?
      </h2>
      <p className="text-[53px]/[58px] -tracking-[.2px] font-instrument-serif max-w-[439px]">
        Everything You Need to Know, All in One Place
      </p>
      <p className="text-[16px]/[24px] -tracking-[.1px] text-[#0a0a0aaa]">
        Discover quick and comprehensive answers to common questions about our
        platform, services, and features.
      </p>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="w-full"
      >
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
