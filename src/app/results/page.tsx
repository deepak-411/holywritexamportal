
import ResultSearchForm from "@/components/results/ResultSearchForm";
import Logo from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ResultSearchPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-lg">
        <CardHeader className="items-center text-center">
          <Logo />
          <CardTitle className="font-headline text-3xl">Check Your Result</CardTitle>
          <CardDescription>
            Enter your details to find your marksheet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResultSearchForm />
           <div className="mt-4 text-center text-sm">
            Go back to{" "}
            <Link href="/auth" className="underline text-primary">
              role selection
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    