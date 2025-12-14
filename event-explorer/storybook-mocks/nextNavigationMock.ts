// ✅ Mock version of next/navigation for Storybook
export const useRouter = () => ({
  push: (href: string) => console.log("Mock navigate to:", href),
  prefetch: () => {},
  replace: () => {},
});
