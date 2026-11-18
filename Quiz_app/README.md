# QuizApp mobile app

Flutter mobile client for the existing Quiz Management System backend.

## Run

Start the existing backend on port 5000, then run from `Quiz_app`:

```sh
flutter pub get
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:5000
```

Use the computer's LAN IP instead of `10.0.2.2` when connecting a physical phone.

## Flutter source layout

- `lib/main.dart`: app entry point and theme setup.
- `lib/screens/`: app shell and individual home, explore, authentication, quiz, results, progress, and profile screens.
- `lib/core/`: HTTP client for the existing API.
- `lib/models/`: quiz question and result models.
- `lib/theme/`: app colors and backend URL.
- `lib/widgets/`: shared UI components.
