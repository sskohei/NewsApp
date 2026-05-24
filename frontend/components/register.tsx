'use client';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./ui/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import User from "./userRegister";
import Login from "./login";

export default function Register(){
    return(
        <div className="max-w-md mx-auto w-full">
                <Tabs defaultValue="login">
                    <TabsList>
                        <TabsTrigger value="login">ログイン</TabsTrigger>
                        <TabsTrigger value="register">登録</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Login/>
                    </TabsContent>
                    <TabsContent value="register">
                        <User/>
                    </TabsContent>
                </Tabs>
            </div>
    )
}