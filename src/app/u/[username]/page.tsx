"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";

const specialChar = "||";

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const [isSuggestLoading, setisSuggestLoading] = useState(false);
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [suggestionMessage, setsuggestionMessage] = useState<string | string[]>(
    ""
  );

  function parseQuestions(messageString: string | string[]): string[] {
    if (typeof messageString === "string") {
      // If messageString is a string, split it by "||"
      return messageString.split("||");
    } else {
      // If messageString is already an array, return it as is
      return messageString;
    }
  }
  useEffect(() => {
    const data = parseQuestions(initialMessageString);
    setsuggestionMessage(data);
  }, []);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestedMessages = async () => {
    try {
      const response = await axios.get("/api/suggest-messages");
      console.log(response.data.suggestion);
      const result = parseQuestions(response.data.suggestion);
      setsuggestionMessage(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });
      console.log(response);
      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none py-2"
                    style={{
                      border: "1px solid white",
                      background: "rgba(24, 24, 27, 0.5)",
                      paddingTop: "10px",
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button
                disabled
                className="border border-white"
                style={{ border: "1px solid white" }}
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                className="border border-white"
                style={{ border: "1px solid white" }}
                type="submit"
                disabled={isLoading || !messageContent}
              >
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8 bg-zinc-900 text-white">
        <div className="space-y-2">
          <Button
            className="border border-white my-4"
            style={{ border: "1px solid white" }}
            onClick={fetchSuggestedMessages}
            disabled={isSuggestLoading}
          >
            Suggest Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card
          style={{
            border: "1px solid white",
            background: "rgba(24, 24, 27, 0.5)",
          }}
        >
          <CardHeader>
            <h3 className="text-xl font-semibold text-white">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {Array.isArray(suggestionMessage) ? (
              suggestionMessage.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            ) : (
              <Button
                variant="outline"
                className="mb-2"
                onClick={() => handleMessageClick(suggestionMessage)}
              >
                {suggestionMessage}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button
            className="border border-white"
            style={{ border: "1px solid white" }}
          >
            Create Your Account
          </Button>
        </Link>
      </div>
    </div>
  );
}
