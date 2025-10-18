"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Status pill component
function StatusBadge({ status }: { status: "Success" | "Process" | "Failed" }) {
  const map: Record<string, string> = {
    Success: "bg-emerald-600/20 text-emerald-300 border border-emerald-700",
    Process: "bg-amber-500/20 text-amber-300 border border-amber-600",
    Failed: "bg-rose-600/20 text-rose-300 border border-rose-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
}

// Dummy transactions
const DUMMY_TXS = [
  {
    id: "#1",
    address: "0xA3c1...9bF7",
    status: "Success" as const,
    healthFactor: 2.0,
    amountUsd: 150,
    walletAddress: "0xA3c1eF22991c4dD39a...9bF7",
    expDate: "2025-12-31",
  },
  {
    id: "#2",
    address: "0x19F4...dE21",
    status: "Process" as const,
    healthFactor: 1.8,
    amountUsd: 75,
    walletAddress: "0x19F4cd8e001233be...dE21",
    expDate: "2025-11-20",
  },
  {
    id: "#3",
    address: "0x7b9A...42Cc",
    status: "Failed" as const,
    healthFactor: 2.4,
    amountUsd: 220,
    walletAddress: "0x7b9AA0029cD453f0...42Cc",
    expDate: "2025-10-30",
  },
];

export default function HistoryPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
      {/* Top bar */}
      <nav className="flex items-center justify-between px-4 py-3 border-b border-emerald-800">
        <div className="text-2xl font-bold text-emerald-400 tracking-wide">
          Treva
        </div>
        <div className="opacity-70 text-sm">History</div>
      </nav>

      <main className="container mx-auto px-4 py-10">
        <Card className="bg-slate-800/80 border-emerald-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-emerald-400">Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {DUMMY_TXS.map((tx) => {
              const isOpen = openId === tx.id;
              return (
                <div
                  key={tx.id}
                  className="rounded-2xl border border-emerald-800/60 overflow-hidden bg-slate-900/60"
                >
                  {/* Row header */}
                  <button
                    onClick={() => setOpenId(isOpen ? null : tx.id)}
                    className="w-full flex items-center gap-4 p-3 md:p-4 hover:bg-slate-800/60 transition-colors"
                    aria-expanded={isOpen}
                  >
                    {/* Left: ID */}
                    <div className="flex-shrink-0 w-16 md:w-24">
                      <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl grid place-items-center border border-slate-700 bg-slate-800/50 text-slate-200 font-semibold">
                        {tx.id}
                      </div>
                    </div>

                    {/* Middle: Address */}
                    <div className="flex-1 text-left">
                      <div className="truncate text-slate-200 md:text-lg font-medium">
                        {tx.address}
                      </div>
                    </div>

                    {/* Right: Status */}
                    <div className="flex-shrink-0">
                      <StatusBadge status={tx.status} />
                    </div>
                  </button>

                  {/* Details dropdown */}
                  {isOpen && (
                    <div className="px-4 md:px-6 pb-5 pt-2">
                      <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-400">Health Factor</div>
                            <div className="text-slate-100 font-medium">
                              {tx.healthFactor}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-400">
                              Amount (mock USD)
                            </div>
                            <div className="text-slate-100 font-medium">
                              ${tx.amountUsd}
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-slate-400">Wallet Address</div>
                            <div className="text-slate-100 font-mono break-all">
                              {tx.walletAddress}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-400">Exp. Date</div>
                            <div className="text-slate-100 font-medium">
                              {tx.expDate}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                          <Button
                            variant="secondary"
                            className="bg-amber-500/20 text-amber-300 border border-amber-600"
                          >
                            Edit
                          </Button>
                          <Button variant="destructive">Stop</Button>
                          <Button className="bg-emerald-600 hover:bg-emerald-700">
                            Repeat
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
