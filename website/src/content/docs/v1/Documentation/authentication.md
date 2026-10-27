---
title: Authentication
---

By default, Gaseous Server uses password-based authentication. From version 2.0 onward you can enable stronger options: Two-Factor Authentication (2FA) and OAuth2 / OIDC based sign‑in.

## Two-Factor Authentication (2FA)

Recommended when using password (non-OIDC) authentication on an internet-facing server.

Steps:
1. Click your avatar (top right).
2. Choose Profile and Account.
3. Open Two Factor Authentication.
4. Click Enable 2FA.
5. Scan the displayed QR code with an authenticator app.
6. Enter the generated code and click Confirm.
7. Close the dialog.

## OAuth2 / OIDC Sign-In

Supported providers:
- Google
- Microsoft
- Custom OIDC (authority + client credentials)

You may enable any combination. A user record is created automatically on first successful login. If multiple providers return the same verified email, the user can sign in with any of them.

Note: Provider-specific setup (e.g. creating client IDs/secrets) is not covered here.

### OIDC callback URL

Register this callback URL with the OIDC provider:

```text
https://<gaseous-server-host>/signin-oidc
```

Use the externally visible HTTPS scheme and host. If Gaseous Server is behind a reverse proxy, register the public URL, not the internal container URL.

### Managing roles and age restrictions from OIDC

Gaseous Server reads role values from the OIDC ID token or UserInfo response on every OIDC login. Supported claim names include `role`, `roles`, `groups`, and `gaseous_role`; Keycloak `realm_access.roles` and `resource_access.*.roles` are also supported. Each value must combine the local role and age restriction in this format:

```text
<role name>:<age restriction>[+]
```

Examples:

| Claim value | Effect |
| ----------- | ------ |
| `Player:Mature` | Assigns the `Player` role and sets the maximum age restriction to `Mature`. |
| `Player:Mature+` | Same as above, and allows unrated games. |

Role names are `Player`, `Gamer`, or `Admin`. Age restrictions are `Child`, `Teen`, `Mature`, or `Adult`. Values are case-insensitive. The optional `+` suffix on the age restriction enables unrated games. The former separate `gaseous_age_restriction` and `gaseous_include_unrated` claims are no longer used.

On each OIDC login, a valid composite value synchronizes the local role and updates the user's age restriction and unrated-game preference. If multiple valid values are provided, `Admin` takes precedence over `Gamer`, which takes precedence over `Player`. Only issue `Admin` to trusted users. Values that do not match the format or supported names are ignored. If no valid value is provided, an existing built-in local role is left unchanged; a user with no built-in role receives `Player`. In that case, age settings are left unchanged.

For Microsoft Entra ID, configure an app role or other OIDC role claim to emit the complete value, such as `Player:Mature+`; assigning a plain `Player` app role is not sufficient. Other compatible providers can emit the same value in any of the supported claim names.

Configure these settings under the SocialAuthConfiguration section (or via environment variables):

| Config Setting            | Env Var                | Description / Value |
| ------------------------- | ---------------------- | ------------------- |
| PasswordLoginEnabled      | passwordloginenabled   | Enable/disable password login (true/false). |
| GoogleClientId            | googleclientid         | Google OAuth2 client ID. |
| GoogleClientSecret        | googleclientsecret     | Google OAuth2 client secret. |
| MicrosoftClientId         | microsoftclientid      | Microsoft application (client) ID. |
| MicrosoftClientSecret     | microsoftclientsecret  | Microsoft client secret. |
| OIDCAuthority             | oidcauthority          | Base authority URL (e.g. https://id.example.com). |
| OIDCClientId              | oidcclientid           | OIDC client ID. |
| OIDCClientSecret          | oidcclientsecret       | OIDC client secret. |

Important: Any enabled OAuth2 / OIDC provider will create a local account on successful authorization. Restrict provider access (e.g. allowed domains, tenant restrictions) to prevent unwanted account creation.
