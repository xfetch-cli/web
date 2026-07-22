"use client";

export default function Hero() {
  return (
    <header className="mx-auto grid w-full max-w-5xl gap-4 px-6 pt-28 pb-0">
      <div className="flex justify-center">
        <img
          src="https://raw.githubusercontent.com/xfetch-cli/assets/main/logo/banner/xfetch.svg"
          alt="xfetch banner"
          className="w-full max-w-[38rem] h-auto"
        />
      </div>
      <p className="max-w-[68ch] text-[#8b91a8] leading-relaxed text-center mx-auto">
        A cross-platform system information fetching tool written in Rust.
      </p>
    </header>
  );
}
