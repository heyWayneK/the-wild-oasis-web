import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;
  // if (!params.cabinId) return Response.json({ message: "Error, no /cabinId" });

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    // const res = JSON.stringify(data);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "Cabin Not Found" });
  }
}

export async function PUSH() {}

// PUT PATCH DELETE etc

// REQUEST OBJECT
// Request {
//   method: 'GET',
//   url: 'http://localhost:3000/api/cabins/66',
//   headers: Headers {
//     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//     'accept-encoding': 'gzip, deflate, br, zstd',
//     'accept-language': 'en-US,en;q=0.9,af;q=0.8',
//     'cache-control': 'max-age=0',
//     connection: 'keep-alive',
//     host: 'localhost:3000',
//     'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"macOS"',
//     'sec-fetch-dest': 'document',
//     'sec-fetch-mode': 'navigate',
//     'sec-fetch-site': 'none',
//     'sec-fetch-user': '?1',
//     'upgrade-insecure-requests': '1',
//     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
//     'x-forwarded-for': '::1',
//     'x-forwarded-host': 'localhost:3000',
//     'x-forwarded-port': '3000',
//     'x-forwarded-proto': 'http'
//   },
//   destination: '',
//   referrer: 'about:client',
//   referrerPolicy: '',
//   mode: 'cors',
//   credentials: 'same-origin',
//   cache: 'default',
//   redirect: 'follow',
//   integrity: '',
//   keepalive: false,
//   isReloadNavigation: false,
//   isHistoryNavigation: false,
//   signal: AbortSignal { aborted: false }
// }
