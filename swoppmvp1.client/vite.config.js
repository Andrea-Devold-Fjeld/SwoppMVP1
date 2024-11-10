import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "swoppmvp1.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7135';

// https://vitejs.dev/config/
/*
    build: {
        rollupOptions: {
            external: ['@react-google-maps/api'],
            },
        },
 */
export default defineConfig({

    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/ GoogleMapsApiKe/GetGoogleMapsApiKey': {
                target,
                secure: false
            },
            '^/weatherforecast': {
                target,
                secure: false
            },
            '^/account/login': {
                target,
                secure: false
            },
            '^/account/register': {
                target,
                secure: false
            },
            '^/account/refresh': {
                target,
                secure: false
            },
            '^/transporter/checkTransporterRole': {
                target,
                secure: false
            },
            '/Transporter/setTransporterRole': {
                target,
                secure: false
            },
            '^/packet/getpackets': {
                target,
                secure: false
            },
            '^/packet/getpacketsbyuserid': {
                target,
                secure: false
            },
            '^/packet/addpacket': {
                target,
                secure: false
            },
            '^/packet/getpacketbyid': {
                target,
                secure: false
            },
            '^/packet/getavailablepackets': {
                target,
                secure: false
            },
            '^/packet/setavailablepacketwithid': {
                target,
                secure: false
            },
            '^/packet/updatepacket': {
                target,
                secure: false
            },
            '^/packet/DeletePacket': {
                target,
                secure: false
            },
            '^/delivery/getdeliveries': {
                target,
                secure: false
            },
            '^/delivery/getdeliverieswithpackets': {
                target,
                secure: false
            },
            '^/delivery/getdeliverybyuserid': {
                target,
                secure: false
            },
            '^/delivery/adddelivery': {
                target,
                secure: false
            },
            '^/delivery/addpackettodelivery': {
                target,
                secure: false
            },
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
