"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// OnchainKit (v1+)
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import {
  Identity,
  Avatar,
  Name,
  Address,
  EthBalance,
} from "@coinbase/onchainkit/identity";

export default function Home() {
  const [form, setForm] = useState({
    healthFactor: "2.0",
    amountUsd: "",
    walletAddress: "",
    expDate: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: handle submit (send tx / call API)
    console.log("Submitted:", form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 py-3 border-b border-emerald-800">
        {/* kiri: logo text Treva */}
        <div className="text-2xl font-bold text-emerald-400 tracking-wide">
          Treva
        </div>

        {/* kanan: Connect / Profile + Dropdown (OnchainKit) */}
        <div className="flex items-center">
          <Wallet>
            {/* Saat belum login -> tombol ConnectWallet (label bisa diset) */}
            <ConnectWallet disconnectedLabel="Connect Wallet">
              {/* Saat sudah login -> tampilkan avatar + nama/alamat singkat */}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6" />
                {/* Name akan menampilkan ENS/Basename jika ada, fallback ke address */}
                <Name className="hidden sm:block" />
              </div>
            </ConnectWallet>

            {/* Dropdown saat sudah login */}
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address className="text-muted-foreground" />
                <EthBalance />
              </Identity>

              {/* Button 'History' */}
              <WalletDropdownLink icon="history" href="/history">
                History
              </WalletDropdownLink>

              {/* Logout */}
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="container mx-auto max-w-xl px-4 py-16">
        <Card className="bg-slate-800/80 border-emerald-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-emerald-400">DeFi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Health Factor</label>
                <Input
                  type="number"
                  step="0.1"
                  name="healthFactor"
                  value={form.healthFactor}
                  onChange={onChange}
                  className="bg-slate-900 border-emerald-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300">
                  Amount (mock USD)
                </label>
                <Input
                  type="number"
                  name="amountUsd"
                  placeholder="e.g. 100"
                  value={form.amountUsd}
                  onChange={onChange}
                  className="bg-slate-900 border-emerald-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300">Wallet Address</label>
                <Input
                  type="text"
                  name="walletAddress"
                  placeholder="0x..."
                  value={form.walletAddress}
                  onChange={onChange}
                  className="bg-slate-900 border-emerald-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300">Exp. Date</label>
                <Input
                  type="date"
                  name="expDate"
                  value={form.expDate}
                  onChange={onChange}
                  className="bg-slate-900 border-emerald-700 text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
