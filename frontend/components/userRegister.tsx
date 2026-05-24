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

export default function User(){
    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
        const response = await fetch('http://localhost:8000/api/auth/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(true);
            setTimeout(() => router.push('/login'), 3000);
        } else {
            setError(JSON.stringify(data));
        }
        } catch (err) {
        setError('サーバーとの通信に失敗しました。');
        }
    };

    if (success) {
        return <p style={{ textAlign: 'center', marginTop: '50px' }}>登録が完了しました！ログイン画面へ移動します...</p>;
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>登録</FieldLegend>
                        <FieldDescription>
                            下記を入力して登録してください。
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
                                        登録
                                </Button>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    )
}