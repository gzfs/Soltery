import { type SVGProps, component$, useSignal } from "@builder.io/qwik";
import Metamask from "../Adapters/Metamask";
import Phantom from "../Adapters/Phantom";

function MdiLoading(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z"
      ></path>
    </svg>
  );
}

export default component$(() => {
  const walletAction = useSignal(false);
  const walletAddress = useSignal<string | undefined>();
  const currentProvider = useSignal<undefined | any>();
  return (
    <>
      <nav class="flex items-center justify-between border-b-4 border-black px-10 py-5 font-Grotesk">
        <p class="text-4xl font-medium">Soltery</p>
        <div
          class="cursor-pointer border-2 border-black px-5 py-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-shadow hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)]"
          onClick$={() => {
            if (!walletAddress.value) {
              walletAction.value = true;
            }
          }}
        >
          {walletAction.value ? (
            <div class="flex w-full items-center justify-between">
              <MdiLoading class="animate-spin text-2xl" />
              <p class="ml-2">Connecting</p>
            </div>
          ) : (
            <p>
              {walletAddress.value?.slice(0, 10).concat("...") ||
                "Connect Wallet"}
            </p>
          )}
        </div>
      </nav>
      {walletAction.value ? (
        <div>
          {!currentProvider ? (
            <div class="absolute left-[50%] top-[50%] grid w-[300px] -translate-x-1/2 -translate-y-1/2 grid-rows-6 gap-x-4 border-2 border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0)]">
              <div class="row-span-5 grid h-fit w-full border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)]">
                <Phantom
                  walletAddress={walletAddress}
                  parentWalletAction={walletAction}
                />
                <hr class="border border-black" />
                <Metamask />
              </div>
              <div class="row-span-1 place-self-center text-center font-Grotesk">
                <p class="text-xs">Powered By</p>
                <p class="text-2xl font-medium">Callisto Wallets</p>
              </div>
            </div>
          ) : (
            <div class="absolute left-[50%] top-[50%] grid w-[300px] -translate-x-1/2 -translate-y-1/2 grid-rows-6 gap-x-4 border-2 border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0)]">
              <div class="row-span-5 grid h-fit w-full border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)]">
                <Phantom
                  walletAddress={walletAddress}
                  parentWalletAction={walletAction}
                />
                <hr class="border border-black" />
                <Metamask />
              </div>
              <div class="row-span-1 place-self-center text-center font-Grotesk">
                <p class="text-xs">Powered By</p>
                <p class="text-2xl font-medium">Callisto Wallets</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
});
