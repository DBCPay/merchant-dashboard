# DBCPay Merchant Dasbhoard

This documement provides detailed information of the structure of this codebase and it's structure.

If gives insight to the the choice and pattern of structure such as:

1. Project Setup
2. Component Libraries
3. API Integration
4. State Management
5. Routing

## Project setup

This codebase is based on the `React` + `TypeScript` + `Vite` which provides its an out-of-box support for `HMR` and some `Linting` rules.

For more information on the Vite build tool, please the official Vite webesite [here](https://vite.dev/guide/).

## Component Libraries

Currently, two component libraries are being used.

- **Shadcn** - A collection of re-usable components based on Radix (an open source component library). More info here:  [Shadcn](https://ui.shadcn.com/docs) and [Radix UI](https://www.radix-ui.com/)
- **Mantine** - A fully featured React components library. More info [here](https://mantine.dev/getting-started/)

The project base components like `Input`, `Button`, `Avatar`, `Badge`, `Tooltip`, `Switch`, `Radio`, `Checbox`, `Table Cell` etc were building on the Shadcn components. The documentation of this components are available [here](https://dbcpay-storybook-doc.netlify.app/).

Mantine components on the other hand are used in cases where complex component that cannot be easily relicated out of the box is need. For example, the Merchant Dasbhoard Table Pagination component is powered by the Pagination component that has full feature and customization preferences.

## API Integration

The `Axios` library is what power the api integration structure of this web application (project). In the `api` dir of the project is configuration for making api calls.
