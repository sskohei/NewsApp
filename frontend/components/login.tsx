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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){
    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
        const response = await fetch('http://localhost:8000/api/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            // 💡 ログイン成功！手に入れたトークン（通行証）をブラウザに保存する
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            alert('ログインに成功しました！');
            router.push('/'); // ログイン後のリダイレクト先（トップページなど）
        } else {
            setError('ユーザー名またはパスワードが正しくありません。');
        }
        } catch (err) {
        setError('サーバーとの通信に失敗しました。');
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>ログイン</FieldLegend>
                        <FieldDescription>
                            下記を入力してログインしてください。
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>
                                    ユーザー名
                                </FieldLabel>
                                    <Input type="text" name="username" onChange={handleChange}/>
                                <FieldLabel>
                                    パスワード
                                </FieldLabel>
                                <Input type="password" name="password" onChange={handleChange}/>
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
        </div>
    )
}