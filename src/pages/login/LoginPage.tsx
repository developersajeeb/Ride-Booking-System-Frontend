import { LoginForm } from './LoginForm';

const LoginPage = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center px-4 pb-20 pt-28 md:pb-32 md:pt-40">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;