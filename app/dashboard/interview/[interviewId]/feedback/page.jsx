"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchFeedback = async () => {
            const interviewId = params?.interviewId; // Ensure this is the correct param name
            if (interviewId) {
                const result = await db.select()
                    .from(UserAnswer)
                    .where(eq(UserAnswer.mockIdRef, interviewId))
                    .orderBy(UserAnswer.id);

                console.log(result);
                setFeedbackList(result);
            }
        };
        fetchFeedback();
    }, [params]);  // Trigger on params change

    return (
        <div className="p-10 space-y-6">
            {feedbackList?.length === 0 ? (
                <div className="text-center">
                    <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Record Found</h2>
                </div>
            ) : (
                <>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-green-500">You've completed your mock interview successfully! 🎉</h2>
                        <h2 className="font-semibold text-2xl text-gray-800">Here’s Your Interview Feedback</h2>
                    </div>
                    <h2 className="text-sm text-gray-600 text-center">Below are the interview questions, your answers, the correct answers, and feedback to help you improve.</h2>
                    <div>
                        {feedbackList.map((item, index) => (
                            <Collapsible key={index} className="mt-5">
                                <CollapsibleTrigger className="p-3 bg-purple-50 rounded-lg flex justify-between my-2 text-left gap-7 w-full cursor-pointer hover:bg-purple-200">
                                    <span className="text-gray-700 font-medium">{item.question}</span>
                                    <ChevronsUpDown className="h-5 w-5 text-gray-500" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="flex flex-col gap-3 p-4">
                                        <div className="border p-3 rounded-lg bg-red-50">
                                            <h3 className="text-red-600 font-semibold"><strong>Rating:</strong> {item.rating}</h3>
                                        </div>
                                        <div className="p-3 border rounded-lg bg-gray-50">
                                            <h4 className="text-sm font-medium text-gray-700"><strong>Your Answer:</strong></h4>
                                            <p className="text-sm text-gray-900">{item.userAns}</p>
                                        </div>
                                        <div className="p-3 border rounded-lg bg-green-50">
                                            <h4 className="text-sm font-medium text-gray-700"><strong>Correct Answer:</strong></h4>
                                            <p className="text-sm text-gray-900">{item.correctAns}</p>
                                        </div>
                                        <div className="p-3 border rounded-lg bg-blue-50">
                                            <h4 className="text-sm font-medium text-gray-700"><strong>Feedback:</strong></h4>
                                            <p className="text-sm text-gray-900">{item.feedback}</p>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </>
            )}
            <div className="text-center mt-6">
                <Button
                    onClick={() => router.replace('/dashboard')}
                    className="bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 w-full sm:w-auto mx-auto py-2 px-6 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                    Go Back to Dashboard
                </Button>
            </div>
        </div>
    );
}

export default Feedback;
