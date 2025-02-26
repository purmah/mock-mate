"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDailog, setOpenDailog] = useState(false)
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on these details, generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format. Use fields "question" and "answer" in the JSON.`

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const rawResponse = await result.response.text(); // Ensure we get a string

            const cleanResponse = rawResponse
                .replace('```json', '')
                .replace('```', '')
                .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
                .trim();

            let parsedJson;
            if (cleanResponse.startsWith("{") || cleanResponse.startsWith("[")) {
                parsedJson = JSON.parse(cleanResponse);
                console.log(parsedJson);
                setJsonResponse(parsedJson);
            } else {
                console.error("Unexpected Response Format:", cleanResponse);
                setJsonResponse([]);
            }

            if (parsedJson) {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: JSON.stringify(parsedJson), // Store JSON as a string
                        jobPosition,
                        jobDesc,
                        jobExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-yyyy')
                    })
                    .returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID:", resp);
                if (resp.length > 0) {
                    setOpenDailog(false);
                    router.push(`/dashboard/interview/${resp[0]?.mockId}`);
                }
            } else {
                console.log("ERROR: No valid response from AI.");
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-10 border rounded-lg bg-gradient-to-r from-purple-400 to-purple-600
                hover:scale-105 hover:shadow-lg cursor-pointer
                transition-all'
                onClick={() => setOpenDailog(true)}
            >
                <h2 className='text-lg text-center text-white font-semibold'>+ Add New</h2>
            </div>
            <Dialog open={openDailog}>
    <DialogContent className="max-w-2xl p-8 rounded-xl shadow-xl bg-gradient-to-r from-purple-300 to-purple-500">
        <DialogHeader>
            <DialogTitle className="text-3xl font-semibold text-center text-white">Tell us more about your job interview</DialogTitle>
            <DialogDescription className="text-lg text-white mt-2 mb-6">
                Please provide details about the job role, description, and your experience to generate customized interview questions.
            </DialogDescription>
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Job Role/Job Position</label>
                        <Input
                            placeholder="Ex. Full Stack Developer"
                            required
                            onChange={(event) => setJobPosition(event.target.value)}
                            className="w-full mt-2 p-3 rounded-md bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Job Description/ Tech Stack</label>
                        <Textarea
                            placeholder="Ex. React, Angular, NodeJs, MySql etc"
                            required
                            onChange={(event) => setJobDesc(event.target.value)}
                            className="w-full mt-2 p-3 rounded-md bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Years of Experience</label>
                        <Input
                            placeholder="Ex. 5"
                            type="number"
                            required
                            max="100"
                            onChange={(event) => setJobExperience(event.target.value)}
                            className="w-full mt-2 p-3 rounded-md bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                </div>

                <div className="flex gap-4 justify-end">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setOpenDailog(false)}
                        className="px-6 py-3 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition"
                    >
                        {loading ? (
                            <><LoaderCircle className="animate-spin" /> Generating from AI</>
                        ) : 'Start Interview'}
                    </Button>
                </div>
            </form>
        </DialogHeader>
    </DialogContent>
</Dialog>

        </div>
    );
}

export default AddNewInterview;
