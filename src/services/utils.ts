export default function serviceSleep(): Promise<void> {
  return new Promise((resolve: () => void) => setTimeout(resolve, 50));
}
