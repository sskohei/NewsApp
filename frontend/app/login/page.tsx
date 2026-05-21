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
} from "@/components/ui/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
            <div className="max-w-md mx-auto w-full">
                <Tabs defaultValue="login">
                    <TabsList>
                        <TabsTrigger value="login">ログイン</TabsTrigger>
                        <TabsTrigger value="register">登録</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <form>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>ログイン</FieldLegend>
                                    <FieldDescription>
                                        下記を入力してログインしてください。
                                    </FieldDescription>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                アカウント名
                                            </FieldLabel>
                                            <Input />
                                            <FieldLabel>
                                                パスワード
                                            </FieldLabel>
                                            <Input/>
                                        </Field>
                                        <Field>
                                            <Button>
                                                ログイン
                                            </Button>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                            </FieldGroup>
                        </form>
                    </TabsContent>
                    <TabsContent value="register">
                        <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>登録</FieldLegend>
                                    <FieldDescription>
                                        下記を入力して登録してください。
                                    </FieldDescription>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>
                                                アカウント名
                                            </FieldLabel>
                                            <Input />
                                            <FieldLabel>
                                                パスワード
                                            </FieldLabel>
                                            <Input/>
                                        </Field>
                                        <Field>
                                            <Button>
                                                登録
                                            </Button>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                            </FieldGroup>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}