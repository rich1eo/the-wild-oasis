# The Wild Oasis

Internal application used inside the hotel to manage booking, cabins and guests.

[Live Demo](https://the-wild-oasis-teal.vercel.app)

## Requirements

<details open>
<summary>Authentication</summary>

- Users of the app are hotel employees. They need to be logged into the application to perform tasks

- New users can only be signed up inside the applications (to guarantee that only actual hotel employees can get accounts)
- Users should be able to upload an avatar, and change their name and password
</details>
<br>

<details>
<summary>Cabins</summary>

- App needs a table view with all cabins, showing the cabin photo, name, capacity, price, and current discount

- Users should be able to update or delete a cabin, and to create new cabins (including uploading a photo)
</details>
<br>

<details>
<summary>Bookings</summary>

- App needs a table view with all bookings, showing arrival and departure dates, status, and paid amount, as well as cabin and guest data

- The booking status can be "unconfirmed" (booked but not yet checked in), "checked in", or "checked out". The table should be filterable by this important status

- Other booking data includes: number of guests, number of nights, guest observations, whether they booked breakfast, breakfast price
</details>
<br>

<details>
<summary>Check In/Out</summary>

- Users should be able to delete, check in, or check out a booking as the guest arrives (no editing necessary for now)

- Bookings may not have been paid yet on guest arrival. Therefore, on check in, users need to accept payment (outside the app), and then confirm that payment has been received (inside the app)

- On check in, the guest should have the ability to add breakfast for the entire stay, if they hadn't already
</details>
<br>

<details>
<summary>Guests</summary>

- Guest data should contain: full name, email, national ID, nationality, and a country flag for easy identification
  </details>
  <br>

<details>
<summary>Dashboard</summary>

- The initial app screen should be a dashboard, to display important information for the last 7, 30, or 90 days:

  - A list of guests checking in and out on the current day. Users should be able to perform these tasks from here
  - Statistics on recent bookings, sales, check ins, and occupancy rate
  - A chart showing all daily hotel sales, showing both "total" sales and "extras" sales (only breakfast at the moment)
  - A chart showing statistics on stay durations, as this is an important metric for the hotel
  </details>
  <br>

<details>
<summary>Settings</summary>

- Users should be able to define a few application-wide settings: breakfast price, min and max nights/booking, max guests/booking
</details>
<br>

And dark mode 🌚

## Tech Features

Frontend:

- **Routing**: React Router
- **Styling**: Styled Components, optimized for desktop only
- **Remote State Management**: React Query, with features like caching, automatic re-fetching, pre-fetching, offline support, etc.
- **UI State Management**: Context API, there is almost no UI state needed in this app, so one simple Context with useState is enought
- **Form management**: React Hook Form for handling big form
- **Other Tools**: React Icons, React Hot Toasts, Recharts, dateFns

Backend:

- **Supabase**: allow to create postgres database with automatic configure API, also is used for authentication and file storage

This project is build with:

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Styled Components](https://styled-components.com)
- [Supabase](https://supabase.com)
- [Vite](https://vitejs.dev)
- [Hosted by Vercel](https://vercel.com)

React third-party packeges:

- [React Router](https://reactrouter.com/en/main)
- [React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://www.react-hook-form.com)
- [React Icons](https://react-icons.github.io/react-icons)
- [React Hot Toasts](https://react-hot-toast.com)
- [Recharts](https://recharts.org)
- [DateFns](https://date-fns.org)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
