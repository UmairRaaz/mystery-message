'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/message.json";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const Home = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl font-bold md:text-5xl">
          Dive into the world of Anonymous Conversations
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Explore Mystery Messages - Where you identity remains secret
        </p>
      </section>
      <Carousel
      plugins={[Autoplay({delay : 2000})]}
      className="w-full max-w-xs">
      <CarouselContent>
        {messages.map((message, index)=>(
           <CarouselItem key={index}>
           <div className="p-1">
             <Card style={{height : "200px"}}>
              <CardHeader>
                {message.title}
              </CardHeader>
               <CardContent className="">
                 <span className="text-lg font-semibold">{message.content}</span>
               </CardContent>
               <CardFooter>{message.received}</CardFooter>
             </Card>
           </div>
         </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </main>
  );
};

export default Home;
