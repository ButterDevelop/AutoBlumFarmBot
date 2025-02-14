# AutoBlumFarm Frontend

[![Demo Video](https://img.youtube.com/vi/-OldS7lsikE/0.jpg)](https://www.youtube.com/watch?v=-OldS7lsikE)

## Overview

The AutoBlumFarm Frontend is a React.js-powered web interface for interacting with the AutoBlumFarm platform—a sophisticated automation and management system for Telegram mini-app accounts used by the crypto project Blum. This frontend allows users to easily manage their accounts, purchase slots, check their rewards, and interact with the system in a user-friendly, responsive environment.

AutoBlumFarm automates a range of daily tasks including:
- Collecting daily rewards  
- Playing drop-games to earn points  
- Activating farming operations at regular intervals  
- Handling tasks and friend reward claims  

These actions are carefully randomized and scheduled to mimic human behavior, ensuring smooth and secure automation. While the backend (written in C# and ASP.NET Core) handles the heavy lifting, the frontend built in React provides a seamless and engaging user experience.

## Key Features

- **Intuitive Dashboard:**  
  View account status, balances, tickets, and referral information at a glance.

- **Slot Management:**  
  Purchase and manage account slots with real-time pricing and discount calculations.

- **Automated Reward Collection:**  
  Monitor daily rewards and farming activations with clear visual feedback.

- **Multi-language Support:**  
  Integrated i18n support with several available languages to cater to a global audience.

- **Responsive Design:**  
  Built with modern React components and styled using a combination of CSS and styled-components for a fluid user experience across devices.

- **Real-time Notifications:**  
  Interactive modals, scroll boxes, and loading screens provide feedback during data fetches and transactions.

## Technologies & Achievements

The frontend of AutoBlumFarm is built using modern web technologies to deliver a fast, robust, and user-friendly interface:

- **React.js & TypeScript:**  
  Leveraging the power of React for component-based UI and TypeScript for type safety and maintainability.

- **Vite:**  
  A lightning-fast development server and build tool that optimizes the frontend workflow.

- **React Hooks & Context Providers:**  
  Custom hooks (such as `useAuthenticate`, `useBuySlots`, `useFetchUserAvatar`, and many others) and context providers (e.g. `AccountsProvider`, `AuthProvider`, `GeoProvider`, `ReferralsProvider`, `UserProvider`) ensure modular, reusable, and testable code.

- **Internationalization (i18n):**  
  The project includes language-specific JSON files (e.g. `src/locales/en.json`) and utility functions to translate texts, making the platform accessible in multiple languages.

- **API Integration & Payment Handling:**  
  The frontend communicates with the backend API to process user actions—from authentication and slot purchasing to managing referrals and executing Telegram bot commands.

- **Modern UI/UX:**  
  Thoughtfully designed components (such as `HeaderNav`, `FooterNav`, `ModalMessage`, and dynamic scroll boxes) enhance user engagement and provide clear navigation through the platform.

- **Build & Dependency Management:**  
  Managed via `yarn` and supported by configuration files like `vite.config.ts`, `tsconfig.json`, and `package.json`.

## Project Structure

Below is an abbreviated overview of the project structure:
<details>
<summary>Structure</summary>
```
AutoBlumFarm Frontend/
├── LICENSE
├── README.md
├── configure.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── yarn.lock
├── public/
│ └── vite.svg
├── src/
│ ├── App.css
│ ├── App.tsx
│ ├── components/
│ │ ├── common/
│ │ │ ├── FooterNav.tsx
│ │ │ ├── HeaderNav.tsx
│ │ │ └── helpers/
│ │ │ ├── FriendsScrollBox.tsx
│ │ │ ├── ModalMessage.tsx
│ │ │ └── ScrollBox.tsx
│ │ ├── homePanel/
│ │ │ ├── HomePanel.tsx
│ │ │ ├── HomePanelScrollBoxItem.tsx
│ │ │ ├── TrialButton.tsx
│ │ │ ├── common/
│ │ │ │ └── ProfileImage.tsx
│ │ │ └── modals/
│ │ │ ├── AccountInfoModal.tsx
│ │ │ ├── AddAccountModal.tsx
│ │ │ └── BuySlotsModal.tsx
│ │ ├── inviteFriendsPanel/
│ │ │ ├── AccountsReferralScrollBoxItem.tsx
│ │ │ ├── InviteButtons.tsx
│ │ │ └── InviteFriendsPanel.tsx
│ │ ├── paymentPanel/
│ │ │ ├── HeaderPaymentPanel.tsx
│ │ │ ├── PaymentPanel.tsx
│ │ │ ├── StarsSection.tsx
│ │ │ └── UsdSection.tsx
│ │ └── styled/
│ │ └── styled.tsx
│ ├── constants/
│ │ ├── constants.ts
│ │ └── types.ts
│ ├── hooks/
│ │ ├── useActivateTrial.ts
│ │ ├── useAuthenticate.ts
│ │ ├── useBuySlots.ts
│ │ ├── useChangeLanguage.ts
│ │ ├── useConvertStarsToUsd.ts
│ │ ├── useConvertUsdToStars.ts
│ │ ├── useCreateOrder.ts
│ │ ├── useFetchAccounts.ts
│ │ ├── useFetchAllAvailableLanguages.ts
│ │ ├── useFetchAllGeo.ts
│ │ ├── useFetchReferrals.ts
│ │ ├── useFetchSlotPrice.ts
│ │ ├── useFetchUserAvatar.ts
│ │ ├── useScrollBox.ts
│ │ ├── useUpdateAccount.ts
│ │ └── useUserMe.ts
│ ├── locales/
│ │ └── en.json
│ ├── utils/
│ │ ├── accountUtils.ts
│ │ ├── baseUtils.ts
│ │ ├── paymentTransaction.ts
│ │ ├── purchaseUtils.ts
│ │ ├── telegramAuthUtils.ts
│ │ └── translationUtils.ts 
│ ├── global.d.ts
│ ├── index.css
│ ├── main.tsx
│ └── vite-env.d.ts
```
</details>

## Demo Video

Watch the demo video to see AutoBlumFarm in action:  
[https://www.youtube.com/watch?v=-OldS7lsikE](https://www.youtube.com/watch?v=-OldS7lsikE)

## Acknowledgments

This project would not have been possible without the hard work and collaboration of many talented individuals. Special thanks to:

- [aa1dre](https://github.com/aa1dre)
- [gleb0375](https://github.com/gleb0375)

Your contributions have been invaluable!

## Contributing

Contributions are welcome! If you wish to report a bug, suggest improvements, or submit a pull request, please follow the repository guidelines. Make sure to adhere to the established code style and test any changes thoroughly.

## License

[MIT License](LICENSE)

Happy coding and enjoy managing your AutoBlumFarm accounts with this modern, feature-rich frontend!