'use client';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
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
 } from "@/components/ui/field";

interface UserData{
    username:string,
}

export default function Page(){
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
        // 💡 ログイン時に保存したトークンを取り出す
        const token = localStorage.getItem('accessToken');

        // トークンがなければログイン画面へ強制送還
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/auth/me/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 💡 ここが超重要！「Bearer 空白 トークン」の形で送ります
                'Authorization': `Bearer ${token}`,
            },
            });

            if (response.ok) {
            const data = await response.json();
            setUser(data);
            } else {
            // トークンの期限切れなどの場合はトークンを消してログインへ
            localStorage.removeItem('accessToken');
            router.push('/login');
            }
        } catch (err) {
            console.error('通信エラー:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchUserProfile();
    }, [router]);

    const handleLogout = () => {
        // 💡 ログアウトは、ブラウザに保存したトークンを消去するだけ！
        localStorage.clear();
        alert('ログアウトしました');
        router.push('/login');
    };    

    if (loading) return <p className="flex justify-center m-50">読み込み中...</p>;
    
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
                    <a href="mypage">マイページ</a>
                    </Button>
                </div>
            </div>
            <form onSubmit={handleLogout}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>マイページ</FieldLegend>
                        <FieldDescription>
                            登録した情報を確認できます。
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>
                                    ユーザー名
                                </FieldLabel>
                                {user?.username}
                            </Field>
                            <Field>
                                <Button>
                                    ログアウト
                                </Button>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    )
}