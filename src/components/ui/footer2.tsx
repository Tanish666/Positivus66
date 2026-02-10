import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Facebook, Twitter } from "lucide-react";
import Image from "next/image";

export default function PositivusFooter() {
    return (
        <footer className="w-full bg-[#191A23] text-white px-6 md:px-16 py-14 rounded-t-[3rem]">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-12">
                    {/* Left */}
                    <div className="space-y-8 max-w-md">
                        {/* Logo Placeholder */}
                        <div className="flex items-center gap-3">
                            {/* Replace this div with your Image */}
                            <Image src="/footLogo.svg" width={200} height={200} alt="" />
                        </div>

                        {/* Contact */}
                        <div className="space-y-4">
                            <span className="inline-block bg-lime-400 text-black text-sm px-3 py-1 rounded-md font-bold text-lg cursor-default">
                                Contact us:
                            </span>

                            <div className="space-y-2 text-sm text-white/80">
                                <p>Email: info@positivus.com</p>
                                <p>Phone: 555-567-8901</p>
                                <p>
                                    Address: 1234 Main St
                                    <br />
                                    Moonstone City, Stardust State 12345
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex-1 flex flex-col gap-8">
                        {/* Nav */}
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <nav className="flex flex-wrap gap-6 text-sm text-white/80">
                                <a className="hover:text-white transition">About us</a>
                                <a className="hover:text-white transition">Services</a>
                                <a className="hover:text-white transition">Use Cases</a>
                                <a className="hover:text-white transition">Pricing</a>
                                <a className="hover:text-white transition">Blog</a>
                            </nav>

                            {/* Socials */}
                            <div className="flex items-center gap-3">
                                <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                                    <Linkedin size={16} />
                                </button>
                                <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                                    <Facebook size={16} />
                                </button>
                                <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                                    <Twitter size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Subscribe Card */}
                        <Card className="bg-white/5 border-white/10 p-6 rounded-2xl">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Input
                                    placeholder="Email"
                                    className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                <Button className="bg-lime-400 text-black hover:bg-lime-300 whitespace-nowrap">
                                    Subscribe to news
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-10" />

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-white/60">
                    <p>© 2023 Positivus. All Rights Reserved.</p>
                    <a className="underline underline-offset-4 hover:text-white transition">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}
