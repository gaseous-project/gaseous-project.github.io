---
title: Save States
---

When a state is downloaded from the server, the state (savestate.state), screenshot (screenshot.jpg), and a json file (rominfo.json) describing the save state are zipped and downloaded.

The json file description is defined as follows:
```json
{
  "Name": "Super Mario Bros. (1985-09-13)(Nintendo)(JP-US).zip",
  "StateDateTime": "2024-06-24T05:34:38",
  "StateName": "",
  "MD5": "7d158dcd242e77ba249ac8342474aa77",
  "SHA1": "3d4b04dc78f9d998f17d9fe9ad982a83b5ed72df",
  "Type": "ROM"
}
```

| Attribute | Value |
| -------- | ------|
| Name | The name of the ROM that the state belongs to. This is merely a convenience attribute. |
| StateDateTime | The date and time (in UTC) when the state was initially saved. |
| StateName | The name of the state |
| MD5 | The MD5 hash of the ROM that the state belongs to. |
| SHA1 | The SHA1 hash of the ROM that the state belongs to. |
| Type | Whether the state belongs to a ROM or ROM Group |

If the zip is re-uploaded, the above json file will be used to automatically match the saved state to the ROM that created it.

If a zip is uploaded without the above three files, the upload will fail.

If a file is uploaded that is not a zip, it will be stored against the currently running ROM and a warning will be displayed that Gaseous was unable to verify that the state belongs to the ROM, and may not function as expected.