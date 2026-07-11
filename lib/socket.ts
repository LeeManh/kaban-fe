import { io, type Socket } from "socket.io-client";

import { getAccessToken } from "@/lib/api/tokens";

function resolveSocketUrl(): string | undefined {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return undefined;
  return new URL(apiUrl).origin;
}

let socket: Socket | undefined;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(resolveSocketUrl(), {
      autoConnect: false,
      auth: (cb) => cb({ token: getAccessToken() }),
    });
  }
  return socket;
}
