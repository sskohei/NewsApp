'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Register from "@/components/register";

export default function Page(){
    return(
        <div className="bg-white text-gray-700 p-10 min-h-screen flex flex-col gap-2">
            <div className="flex justify-between">
                <div className="flex gap-2">
                <Label htmlFor="terms">
                    <a href="/">NewsApp</a>
                </Label>
                </div>
                <div className="flex gap-2">
                    <Button size="icon" className="cursor-pointer">
                    <a href="bookmark">★</a>
                    </Button>
                    <Button>
                    <a href="login">ログイン</a>
                    </Button>
                </div>
            </div>
            <Register/>
        </div>
    )
}