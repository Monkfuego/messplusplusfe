import { type LightbulbIcon as LucideProps, Loader2, LogOut, User, Plus, ChromeIcon as Google } from "lucide-react"

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 19h18" />
      <path d="M5 6v.09c0 5.183 3.154 9.91 8 11.91c4.846 -2 8 -6.727 8 -11.91v-.09a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2z" />
    </svg>
  ),
  spinner: Loader2,
  user: User,
  plus: Plus,
  google: Google,
  logout: LogOut,
}

