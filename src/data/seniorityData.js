export const seniorityData = {
  categories: [
    {
      id: "dart-advanced",
      title: "Dart Advanced",
      icon: "Code2",
      description: "Deep dive into Dart language semantics, concurrency, event loops, and memory management.",
      tasks: [
        {
          id: "dart-generics",
          text: "Generics & Variance",
          desc: "Understand type safety, covariance, contravariance, and generic constraints in Dart class hierarchies."
        },
        {
          id: "dart-mixins",
          text: "Mixins & Extensions",
          desc: "Master mixins (using `on` constraint), extensions, and Extension Types (Dart 3.x) for zero-cost wrappers."
        },
        {
          id: "dart-isolates",
          text: "Isolates & Concurrency",
          desc: "Understand Dart's single-threaded nature. Learn how to spawn Isolates, establish two-way communication using ReceivePort and SendPort, and utilize `Isolate.run()`."
        },
        {
          id: "dart-zones",
          text: "Zones deep dive",
          desc: "Learn how to run code inside a custom Zone to intercept errors globally, manage async call tracking, and handle contextual values."
        },
        {
          id: "dart-streams",
          text: "Streams Deep Dive",
          desc: "Learn Single Subscription vs Broadcast Streams, custom StreamControllers, `StreamTransformer`, and stream pipelines."
        },
        {
          id: "dart-generators",
          text: "Generators (sync* & async*)",
          desc: "Understand the difference between sync (`Iterable` + `sync*`) and async (`Stream` + `async*`) generators and the mechanics of `yield` and `yield*`."
        },
        {
          id: "dart-event-loop",
          text: "Event Loop & Microtasks",
          desc: "Deeply understand how the Microtask Queue and the Event Queue operate. Master the execution order of synchronous code, microtasks, and events."
        },
        {
          id: "dart-memory",
          text: "Memory & Garbage Collection",
          desc: "Learn about Dart's Generational GC (young space scavenger vs old space mark-sweep) and memory retention paths."
        },
        {
          id: "dart-pattern-matching",
          text: "Records & Pattern Matching",
          desc: "Master Dart 3.x features: Records (multiple returns), Pattern Matching, Switch expressions, and Sealed Class hierarchies."
        },
        {
          id: "dart-reflection",
          text: "Reflection in Dart & Flutter",
          desc: "Understand `dart:mirrors`, why it is disabled in Flutter (due to tree-shaking and size), and how code generators (build_runner) bypass this."
        }
      ],
      resources: [
        { title: "Dart Language Tour", url: "https://dart.dev/guides/language/language-tour" },
        { title: "Dart Concurrency & Isolates", url: "https://dart.dev/language/concurrency" },
        { title: "The Event Loop in Dart (Flutter)", url: "https://medium.com/flutter-community/the-menu-of-cupcakes-dart-event-loop-microtasks-5b310189ca85" }
      ]
    },
    {
      id: "flutter-internals",
      title: "Flutter Internals",
      icon: "Layers",
      description: "Mastering the rendering pipeline, BuildContext, Element lifecycle, and Constraint systems.",
      tasks: [
        {
          id: "flutter-three-trees",
          text: "The Three Trees",
          desc: "Understand Widget (blueprint), Element (lifecycle manager/state host), and RenderObject (layout/paint) relationship."
        },
        {
          id: "flutter-buildcontext",
          text: "BuildContext Decoded",
          desc: "Understand what `BuildContext` actually is (the `Element` interface) and how traversal methods like `findAncestorWidgetOfExactType` and `dependOnInheritedWidgetOfExactType` work."
        },
        {
          id: "flutter-keys",
          text: "Keys & State Preservation",
          desc: "Master LocalKeys (ValueKey, ObjectKey, UniqueKey) and GlobalKeys. Understand when and why to use them to preserve state when widgets move in the tree."
        },
        {
          id: "flutter-constraints",
          text: "Layout: Constraints Go Down",
          desc: "Understand the golden rule: Constraints go down, Sizes go up, Parent sets position. Learn how `BoxConstraints` define layout parameters."
        },
        {
          id: "flutter-rendering-phases",
          text: "Layout, Paint & Compositing",
          desc: "Trace the rendering engine phases: Layout -> Paint -> Compositing -> Rasterization. Master RenderObject's paint method and boundary boundaries."
        },
        {
          id: "flutter-repaint-boundary",
          text: "RepaintBoundary",
          desc: "Learn how to isolate rendering subtrees using `RepaintBoundary` to prevent redundant painting, improving frame rate."
        },
        {
          id: "flutter-inherited",
          text: "InheritedWidget & InheritedElement",
          desc: "Learn how InheritedWidget establishes O(1) dependency registration and how elements are notified of rebuilds when values change."
        }
      ],
      resources: [
        { title: "Flutter Architectural Overview", url: "https://docs.flutter.dev/resources/architectural-overview" },
        { title: "How Flutter Renders Widgets", url: "https://youtube.com/watch?v=996g9G4M2vQ" },
        { title: "Flutter's Rendering Pipeline", url: "https://medium.com/flutter/flutter-internals-d1cfc7c8c3e6" }
      ]
    },
    {
      id: "architecture",
      title: "Architecture Decisions",
      icon: "GitFork",
      description: "Designing modular, testable, and scalable enterprise codebases using modern architectures.",
      tasks: [
        {
          id: "arch-feature-first",
          text: "Feature-first Structure",
          desc: "Organize applications by business features (data, domain, presentation per feature) rather than layers (layer-first)."
        },
        {
          id: "arch-modular",
          text: "Modular Architecture",
          desc: "Divide code into separate independent local packages (e.g., core, network, auth, dashboard) to enforce boundaries and speed up compilation."
        },
        {
          id: "arch-ddd",
          text: "Domain Driven Design (DDD)",
          desc: "Implement Rich Domains vs Anemic Domains, Entities, Value Objects, Aggregates, and Repositories to isolate business logic."
        },
        {
          id: "arch-vertical-slice",
          text: "Vertical Slice Architecture",
          desc: "Understand organizing codebase around features/capabilities rather than technical horizontal layers, maximizing cohesion."
        },
        {
          id: "arch-monorepo",
          text: "Monorepo & Melos",
          desc: "Manage multiple Dart packages within a single repository using Melos. Handle dependency sharing, execution of tasks, and versioning."
        },
        {
          id: "arch-dependencies",
          text: "Dependency Graphs",
          desc: "Define dependency direction, avoid cyclic dependencies, and enforce structural rules (e.g. feature-A cannot import feature-B)."
        }
      ],
      resources: [
        { title: "Flutter Project Structure", url: "https://codewithandrea.com/articles/flutter-project-structure-feature-first-layer-first/" },
        { title: "Melos Documentation", url: "https://melos.invertase.dev/" },
        { title: "DDD in Flutter", url: "https://resocoder.com/flutter-clean-architecture-tdd/" }
      ]
    },
    {
      id: "design-patterns",
      title: "Design Patterns",
      icon: "Puzzle",
      description: "Implementing structural, behavioral, and creational patterns tailored to Dart and Flutter.",
      tasks: [
        {
          id: "pat-creational",
          text: "Creational Patterns",
          desc: "Implement Singleton, Factory, Builder, and Service Locator in Dart, knowing the performance and testability tradeoffs."
        },
        {
          id: "pat-structural",
          text: "Structural Patterns",
          desc: "Understand Adapter (translating API responses), Decorator, Facade (simplifying library interfaces), Composite, and Proxy patterns."
        },
        {
          id: "pat-behavioral",
          text: "Behavioral Patterns",
          desc: "Master Observer (BLoC/Streams), Strategy (dynamic algorithms like sorting or analytics providers), Command, and State patterns."
        },
        {
          id: "pat-di-service-locator",
          text: "DI vs Service Locator",
          desc: "Understand the core differences between Dependency Injection (e.g. via constructor injection or package:provider) and Service Locator (e.g. GetIt), specifically around class coupling and testing mocks."
        }
      ],
      resources: [
        { title: "Design Patterns in Dart/Flutter", url: "https://flutterdesignpatterns.com/" },
        { title: "Refactoring.Guru - Design Patterns", url: "https://refactoring.guru/design-patterns" }
      ]
    },
    {
      id: "native-dev",
      title: "Native iOS & Android",
      icon: "Smartphone",
      description: "Bridging Flutter with native Kotlin, Swift, and understanding platform lifecycles.",
      tasks: [
        {
          id: "nat-android-lifecycle",
          text: "Android Application Lifecycle",
          desc: "Understand Android's Activity lifecycle, Services (foreground vs background), Broadcast Receivers, and Content Providers."
        },
        {
          id: "nat-ios-lifecycle",
          text: "iOS Application Lifecycle",
          desc: "Understand UIKit App Lifecycle, UIViewController lifecycle, SceneDelegate, and background execution states."
        },
        {
          id: "nat-channels",
          text: "Platform Channels deep dive",
          desc: "Implement custom MethodChannels, EventChannels (for stream data), and BasicMessageChannels with proper error handling and binary formatting."
        },
        {
          id: "nat-pigeon",
          text: "Type-safe channels with Pigeon",
          desc: "Use Pigeon code generator to define native interfaces, preventing runtime crash bugs caused by misspelled channel strings or parameter type mismatch."
        },
        {
          id: "nat-views",
          text: "Platform Views",
          desc: "Embed native views into the Flutter widget tree using `AndroidView` and `UiKitView`. Understand texture composition overhead and performance implications."
        }
      ],
      resources: [
        { title: "Writing custom platform-specific code", url: "https://docs.flutter.dev/platform-channels" },
        { title: "Pigeon Package", url: "https://pub.dev/packages/pigeon" },
        { title: "Platform Views Performance", url: "https://docs.flutter.dev/perf/rendering/platform-views" }
      ]
    },
    {
      id: "performance",
      title: "Performance Optimization",
      icon: "Zap",
      description: "Diagnosing memory leaks, rendering jank, profiling CPU/GPU, and reducing bundle sizes.",
      tasks: [
        {
          id: "perf-rebuilds",
          text: "Rebuild Profiling & Reduction",
          desc: "Reduce widget rebuild counts using const constructors, localizing setState, using RepaintBoundaries, and leveraging selector-based state reads (e.g. `context.select`)."
        },
        {
          id: "perf-devtools",
          text: "Dart DevTools & CPU Profiler",
          desc: "Profile app execution using the CPU Profiler, CPU flame charts, and tracking execution times of specific functions."
        },
        {
          id: "perf-memory",
          text: "Memory Leaks & Heap Analysis",
          desc: "Learn to read memory heap snapshots, trace path-to-GC-root for retained variables, detect memory leaks, and use `LeakTracker`."
        },
        {
          id: "perf-jank",
          text: "Jank & Dropped Frames Analysis",
          desc: "Understand UI thread vs Raster thread. Diagnose shader compilation jank, and optimize heavy compute logic off the main thread."
        },
        {
          id: "perf-lists",
          text: "Large List Optimization",
          desc: "Optimize lists using `ListView.builder`, setting `itemExtent` or `prototypeItem`, customizing `cacheExtent`, and preventing image decoding on scroll."
        }
      ],
      resources: [
        { title: "Flutter Performance Guide", url: "https://docs.flutter.dev/perf" },
        { title: "Profile App Performance", url: "https://docs.flutter.dev/perf/performance-tools" },
        { title: "Understanding memory leaks", url: "https://medium.com/flutter/understanding-memory-leaks-in-flutter-43261a3ee41" }
      ]
    },
    {
      id: "testing",
      title: "Advanced Testing",
      icon: "TestTube",
      description: "Writing unit, mock, widget, golden, and end-to-end integration tests.",
      tasks: [
        {
          id: "test-mocking",
          text: "Mocktail vs Mockito",
          desc: "Master stubbing and verification. Understand the difference between Mockito (requires build_runner) and Mocktail (runtime-based mocks)."
        },
        {
          id: "test-goldens",
          text: "Golden UI Testing",
          desc: "Write Golden tests to check visual regression across platform configurations, using Alchemist or golden_toolkit, addressing font and asset loading hurdles."
        },
        {
          id: "test-integration",
          text: "Integration & E2E Testing",
          desc: "Write automated user flows using `integration_test` or Patrol, testing real network integrations and native OS popups (permission alerts)."
        },
        {
          id: "test-ci-coverage",
          text: "CI Test Automation & Coverage",
          desc: "Configure test runners in pull request pipelines, enforce code coverage thresholds (e.g. lcov reporting), and set up test result reporting."
        }
      ],
      resources: [
        { title: "Testing Flutter Apps", url: "https://docs.flutter.dev/testing" },
        { title: "Alchemist Golden Testing", url: "https://pub.dev/packages/alchemist" },
        { title: "Patrol E2E testing framework", url: "https://patrol.leancode.co/" }
      ]
    },
    {
      id: "devops",
      title: "DevOps & CI/CD",
      icon: "Terminal",
      description: "Automating pipelines, handling app distribution, and maintaining error reporting.",
      tasks: [
        {
          id: "devops-github-actions",
          text: "GitHub Actions Pipelines",
          desc: "Create workflows for Flutter lint analysis, tests running, and artifact caching (pub cache, cocoapods) to speed up pipelines."
        },
        {
          id: "devops-fastlane",
          text: "Fastlane Automation",
          desc: "Automate code signing, App Store Connect uploads, and Google Play Store uploads using Fastfile, Appfile, and Match."
        },
        {
          id: "devops-cloud-ci",
          text: "Cloud CI/CD Tools",
          desc: "Evaluate and configure cloud mobile CI tools like Codemagic, Bitrise, or App Center, understanding mac-runner scaling costs."
        },
        {
          id: "devops-distribution",
          text: "Beta Distribution",
          desc: "Configure automated beta deployment to Firebase App Distribution, TestFlight, and Google Play Console Internal Testing on push events."
        },
        {
          id: "devops-crashlytics",
          text: "Crashlytics & Sentry Integration",
          desc: "Set up real-time crash reporting, configure custom keys/logs, upload mapping files (dSYMs and deobfuscation maps), and monitor release stability."
        }
      ],
      resources: [
        { title: "Continuous Integration with Flutter", url: "https://docs.flutter.dev/deployment/cd" },
        { title: "Fastlane Documentation", url: "https://docs.fastlane.tools/" }
      ]
    },
    {
      id: "system-design",
      title: "System Design",
      icon: "GitBranch",
      description: "Designing offline-first synchronization, caching, large scale sync, and pagination architectures.",
      tasks: [
        {
          id: "sys-offline-first",
          text: "Offline-First Sync Engine",
          desc: "Design data flow patterns where updates are written to local storage first, then synchronized in background. Handle conflicts (last-write-wins vs merge conflict resolves)."
        },
        {
          id: "sys-cache-strategies",
          text: "Caching & Cache Expiry",
          desc: "Establish caching algorithms: MemoryCache, DiskCache, Cache-Aside pattern, and cache expiration policies based on network conditions."
        },
        {
          id: "sys-pagination",
          text: "Real-time Pagination & Sockets",
          desc: "Design scalable pagination protocols (cursor-based vs offset-based) combined with WebSockets or SSE for real-time list additions."
        },
        {
          id: "sys-background",
          text: "Background Tasks & Sync",
          desc: "Design background synchronization using WorkManager (Android) and Background Tasks (iOS) under OS constraints."
        },
        {
          id: "sys-flavors",
          text: "Multi-Flavor configurations",
          desc: "Structure app target entrypoints (dev, staging, prod) linked with distinct Firebase/server configurations, and different package bundles."
        }
      ],
      resources: [
        { title: "System Design for Mobile Developers", url: "https://github.com/weeeBox/mobile-system-design" },
        { title: "Offline-First Architecture", url: "https://realm.io/resources/offline-first-architecture/" }
      ]
    },
    {
      id: "computer-science",
      title: "Computer Science",
      icon: "Binary",
      description: "Reviewing fundamental data structures, algorithms, SOLID principles, and networking protocols.",
      tasks: [
        {
          id: "cs-data-structures",
          text: "Data Structures in Dart",
          desc: "Analyze built-in Dart collections (HashMap, LinkedHashMap, HashSet, Queue) and understand their internal complexity and performance limits."
        },
        {
          id: "cs-algorithms",
          text: "Algorithms & Search/Sort",
          desc: "Study algorithmic efficiency (Big O). Solve classic DSA problems (recursion, BFS/DFS, binary search) and translate them into performant Dart code."
        },
        {
          id: "cs-solid",
          text: "SOLID Principles in OOP",
          desc: "Apply Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion to Flutter software structures."
        },
        {
          id: "cs-concurrency",
          text: "Multithreading & Concurrency",
          desc: "Compare Dart's event-loop concurrency model against thread-pool memory models in Swift/Kotlin, understanding race conditions and locks."
        },
        {
          id: "cs-networking",
          text: "Networking Protocols",
          desc: "Master HTTP/2, WebSockets, GraphQL, and gRPC. Understand TLS handshake, secure pinning, and payload compression techniques."
        }
      ],
      resources: [
        { title: "Dart Collections Internals", url: "https://medium.com/dartlang/dart-collections-inside-out-3850125bc412" },
        { title: "SOLID Principles in Dart/Flutter", url: "https://medium.com/flutter-community/solid-principles-in-flutter-b952f40be0c3" }
      ]
    },
    {
      id: "leadership",
      title: "Leadership & Strategy",
      icon: "Users",
      description: "Leading code reviews, writing RFC design specs, estimating tasks, and managing design/QA relations.",
      tasks: [
        {
          id: "lead-code-reviews",
          text: "Senior Code Review Standards",
          desc: "Perform reviews prioritizing security, performance, scalability, and code style. Focus on constructive mentoring rather than bikeshedding."
        },
        {
          id: "lead-rfc",
          text: "RFCs & Design Documents",
          desc: "Write clear technical design documents (Request For Comments) before writing code, to align engineering teams on large features."
        },
        {
          id: "lead-estimation",
          text: "Estimation & Scope Management",
          desc: "Accurately estimate technical tasks using story points or hours, identify dependencies, and manage project scope creep."
        },
        {
          id: "lead-mentoring",
          text: "Mentoring & Onboarding",
          desc: "Support and guide junior/mid-level engineers through code walkthroughs, design review pairings, and structured onboarding."
        },
        {
          id: "lead-cross-functional",
          text: "Cross-Functional Collaboration",
          desc: "Facilitate technical discussions with Product Managers (scoping), UX Designers (widget capabilities), and QA (automated test coverage)."
        }
      ],
      resources: [
        { title: "How to write a good software design doc", url: "https://www.freecodecamp.org/news/how-to-write-a-good-software-design-document-596aa4172f3e/" },
        { title: "Google Code Review Guide", url: "https://google.github.io/eng-practices/review/" }
      ]
    },
    {
      id: "open-source",
      title: "Open Source & Packages",
      icon: "Globe",
      description: "Contributing to the Dart/Flutter ecosystem, creating packages, and community engagement.",
      tasks: [
        {
          id: "os-package-publishing",
          text: "Publishing on pub.dev",
          desc: "Create and publish reusable packages on pub.dev. Maintain high pub points by providing documentation, API examples, and clean formats."
        },
        {
          id: "os-contributions",
          text: "Contributing to Open Source",
          desc: "Contribute bug fixes, tests, or features to popular Dart/Flutter packages or the Flutter framework repository directly."
        },
        {
          id: "os-licensing",
          text: "Licensing & Maintenance",
          desc: "Understand open source licensing (MIT, Apache 2.0, BSD) and handle issue triaging and version upgrades (Semantic Versioning)."
        }
      ],
      resources: [
        { title: "Developing packages & plugins", url: "https://docs.flutter.dev/development/packages-and-plugins/developing-packages" },
        { title: "Publishing a Package on pub.dev", url: "https://dart.dev/tools/pub/publishing" }
      ]
    },
    {
      id: "pte-core",
      title: "PTE Core Exam Prep",
      icon: "GraduationCap",
      description: "Comprehensive 6-week study plan & resources for the PTE Core Exam (Speaking, Writing, Reading, Listening).",
      tasks: [
        {
          id: "pte-task-1",
          text: "Review Pearson 19 Question Types",
          desc: "Understand test format, section structures, and exact scoring guidelines for all 19 question types on the Pearson official site."
        },
        {
          id: "pte-task-2",
          text: "Speaking Focus: Read Aloud & Repeat Sentence",
          desc: "Practice daily using ApeUni or AlfaPTE AI engine to calibrate speech recognition, prioritizing oral fluency over speed."
        },
        {
          id: "pte-task-3",
          text: "Writing Section: Email Templates",
          desc: "Memorize and master high-scoring structures and reliable templates for writing emails in the PTE Core exam."
        },
        {
          id: "pte-task-4",
          text: "Write from Dictation & Fill in the Blanks",
          desc: "Daily high-priority drilling for Write from Dictation (Listening) and Fill in the Blanks (Reading & Listening) which carry the heaviest score weight."
        },
        {
          id: "pte-task-5",
          text: "Re-order Paragraphs Practice",
          desc: "Daily logic and context-clue practice for paragraph re-ordering to maximize Reading section points."
        },
        {
          id: "pte-task-6",
          text: "Typing Muscle Memory & Spelling Accuracy",
          desc: "Practice writing email templates on a standard physical keyboard to build typing speed with zero spelling errors."
        },
        {
          id: "pte-task-7",
          text: "Full-Length Third-Party Mock Tests",
          desc: "Complete at least 2 full 2-hour mock tests under strict exam conditions on platforms like ApeUni or Language Academy without pausing."
        },
        {
          id: "pte-task-8",
          text: "AI Score Report Review & Target Drilling",
          desc: "Analyze score breakdowns from AI mock tests, isolate lowest-scoring question types, and drill them intensively."
        },
        {
          id: "pte-task-9",
          text: "Official Pearson Scored Practice Test",
          desc: "Take an official Pearson scored practice test in the final week for accurate score prediction and test-day preparation."
        }
      ],
      resources: [
        { title: "Pearson PTE Official Preparation", url: "https://www.pearsonpte.com/pte-core/preparation/" },
        { title: "ApeUni PTE AI Practice Platform", url: "https://www.apeuni.com/" },
        { title: "AlfaPTE Mock Tests & AI Analytics", url: "https://alfapte.com/" },
        { title: "Language Academy AI Mock Tests", url: "https://www.languageacademy.com.au/mock-test" }
      ]
    }
  ],
  roadmap: [
    {
      month: "Month 1",
      title: "Advanced Dart & Flutter Internals",
      duration: "Weeks 1 - 4",
      focus: "Dart Event Loops, Isolates, Concurrency, Elements lifecycle, RenderObjects, and InheritedWidgets.",
      items: [
        "Master Event Loop microtasks vs event queues.",
        "Spawn multi-Isolates with bidirectional message passing.",
        "Inspect Flutter's three-trees layout mechanics and lifecycle.",
        "Implement custom InheritedWidget and RepaintBoundary structures."
      ]
    },
    {
      month: "Month 2",
      title: "Performance, Testing & Architecture",
      duration: "Weeks 5 - 8",
      focus: "Code profiling, memory leak tracking, golden testing, design patterns, and package monorepos.",
      items: [
        "Profile CPU/GPU performance and eliminate scrolling jank.",
        "Identify memory leaks and analyze heap snapshots using DevTools.",
        "Apply Creational/Structural/Behavioral patterns to components.",
        "Deconstruct a project into local packages within a monorepo via Melos."
      ]
    },
    {
      month: "Month 3",
      title: "System Design, Native & DevOps",
      duration: "Weeks 9 - 12",
      focus: "Offline sync caches, Swift/Kotlin lifecycles, Pigeon type-safe platform channels, and Fastlane CI/CD release automation.",
      items: [
        "Design a background offline-first sync engine.",
        "Implement type-safe Platform Channels using Pigeon.",
        "Integrate custom native Swift & Kotlin services.",
        "Automate store deployments with Fastlane and GitHub Actions."
      ]
    }
  ],
  pteRoadmap: [
    {
      phase: "Phase 1",
      title: "Familiarization and Speaking",
      duration: "Weeks 1 & 2",
      focus: "Understand test format and get comfortable speaking into a microphone with AI evaluation.",
      items: [
        "Review all 19 question types on the Pearson official website to understand expectations.",
        "Practice 'Read Aloud' and 'Repeat Sentence' daily using ApeUni or AlfaPTE to train the AI (focus on oral fluency).",
        "Memorize reliable templates for the Writing section, particularly for writing emails."
      ]
    },
    {
      phase: "Phase 2",
      title: "Heavy Lifting - Reading and Listening",
      duration: "Weeks 3 & 4",
      focus: "Master the highest-scoring question types and build typing speed and accuracy.",
      items: [
        "Dedicate daily practice to 'Write from Dictation' (Listening) and 'Fill in the Blanks' (Reading & Listening).",
        "Practice 'Re-order Paragraphs' daily using logical thinking and context clues.",
        "Type writing templates repeatedly on a standard keyboard for muscle memory and zero spelling errors."
      ]
    },
    {
      phase: "Phase 3",
      title: "Intensive Mock Testing & Target Benchmark",
      duration: "Weeks 5 & 6",
      focus: "Build stamina with 2-hour full-length mock tests and determine your target CLB benchmark.",
      items: [
        "Take at least two full-length 2-hour mock tests on ApeUni or Language Academy under strict exam conditions.",
        "Thoroughly review AI score reports, identify weak question types, and drill those exact questions.",
        "Purchase and take one Official Scored Practice Test from Pearson for an accurate final score prediction."
      ]
    }
  ],
  quizzes: [
    {
      id: "q1",
      category: "dart-advanced",
      question: "Which of the following describes the execution order in the Dart Event Loop?",
      options: [
        "Microtask Queue tasks execute after Event Queue tasks.",
        "Microtask Queue tasks are prioritized and run completely before taking the next event from the Event Queue.",
        "Event Queue and Microtask Queue run in parallel using multi-core execution.",
        "Tasks in the Event Queue can preempt a running task in the Microtask Queue."
      ],
      answerIndex: 1,
      explanation: "Dart runs in a single-threaded loop. Microtask Queue tasks have priority. The loop processes all tasks in the Microtask Queue until empty, and only then executes the next event from the Event Queue. This check is repeated after every single event execution."
    },
    {
      id: "q2",
      category: "flutter-internals",
      question: "What occurs during the 'Compositing' phase of Flutter's rendering pipeline?",
      options: [
        "The constraints are sent down the tree to compute the sizes.",
        "The RenderObjects are traversed to paint their visual instructions onto Canvas objects.",
        "The visual commands are organized into layers, which are sent to the Engine to be rasterized together.",
        "Dart objects are converted into platform-specific Native UI views."
      ],
      answerIndex: 2,
      explanation: "After Layout and Paint (where instructions are drawn), Compositing groups the drawings into Scene/Layer structures. This allows the GPU to combine these layers efficiently (e.g. during animations or scrolling) without re-painting the unchanged RenderObjects, preceding Rasterization."
    },
    {
      id: "q3",
      category: "architecture",
      question: "In a Clean/DDD Architecture, what is the main difference between an Entity and a Value Object?",
      options: [
        "Entities must have an immutable type, whereas Value Objects are always mutable.",
        "Entities are defined by a unique identity that persists over time, whereas Value Objects are defined solely by their property values.",
        "Value Objects can depend directly on data sources (APIs), while Entities cannot.",
        "Entities belong to the Presentation layer, while Value Objects are strictly Data models."
      ],
      answerIndex: 1,
      explanation: "An Entity has an identifier (e.g. ID field) and is unique even if other properties match. A Value Object has no identifier and is defined entirely by the equality of its attributes (e.g. a Money class with amount and currency)."
    },
    {
      id: "q4",
      category: "performance",
      question: "What is the primary benefit of wrapping a scrollable list item with a RepaintBoundary?",
      options: [
        "It stops the widget from rebuilding (re-calling the build method).",
        "It offloads the layout calculations to a separate background thread.",
        "It forces the scrollable item to be drawn onto its own separate display layer, avoiding re-painting when other list parts scroll.",
        "It decreases the memory footprint of the images loaded in the list."
      ],
      answerIndex: 2,
      explanation: "RepaintBoundary creates a separate layer in the compositor. When a repaint is triggered on the list or neighboring widgets, this boundary stops the repaint from propagating, saving GPU painting cycles at the cost of slight memory overhead."
    },
    {
      id: "q5",
      category: "native-dev",
      question: "Why would you choose Pigeon over traditional MethodChannel calls for platform integration?",
      options: [
        "Pigeon executes platform calls on background threads automatically.",
        "Pigeon generates type-safe code for both Dart and native languages, removing the risks of misspelled channel strings and type mismatches.",
        "Pigeon does not use serialization, making platform channels 10x faster.",
        "Pigeon allows writing Kotlin/Swift UI components directly in Dart."
      ],
      answerIndex: 1,
      explanation: "Pigeon compiles a type-safe definition file into Dart, Swift/ObjC, and Kotlin/Java files. This guarantees that parameters and method names match exactly across language boundaries, eliminating runtime bugs caused by spelling issues in method names."
    }
  ],
  interviews: [
    {
      id: "int-rendering",
      title: "Flutter Rendering & Performance",
      difficulty: "Senior",
      questions: [
        {
          q: "How does Flutter build, layout, and paint widgets? Explain the difference between a Widget, an Element, and a RenderObject.",
          modelAnswer: "Widgets are immutable configuration blueprints. Elements are instantiated versions of those widgets that maintain the lifecycle state and the tree structure (BuildContext). RenderObjects handle the actual layout measurements (constraints, sizing) and painting calculations. When a widget changes, the element determines if it can update (matching runtimeType and key) or if it needs to recreate the RenderObject."
        },
        {
          q: "What is shader compilation jank, why does it happen, and how does Flutter (Impeller) resolve it?",
          modelAnswer: "Shader jank occurs when a graphics shader is compiled on the GPU thread during a frame, causing the frame to take longer than 16ms and drop frames. Skia required caching compiled shaders on runtime execution. Impeller, Flutter's new rendering engine, compiles all necessary shaders ahead-of-time (AOT) during the app build process, completely eliminating shader compilation jank."
        }
      ]
    },
    {
      id: "int-dart",
      title: "Advanced Dart & Concurrency",
      difficulty: "Senior",
      questions: [
        {
          q: "Explain how Dart handles concurrency. When would you use a Stream vs an Isolate?",
          modelAnswer: "Dart uses an event-loop, single-threaded model. Tasks can be asynchronous (Futures, Streams) but still run on the same main UI thread, meaning they shouldn't block the loop. For network requests or simple IO, use Streams/Futures. For CPU-bound calculations (JSON parsing of 10MB, encryption, image processing), use an Isolate to run computation on a separate OS thread without blocking the UI thread."
        },
        {
          q: "What are Zones in Dart? Can you give an example of where they are used?",
          modelAnswer: "Zones are asynchronous execution contexts. They allow executing code under custom scopes, intercepting errors, overriding print statements, or keeping track of local values. In Flutter, the framework wraps your application in a zone to catch uncaught async errors (e.g. `runZonedGuarded`), and libraries like Firebase Crashlytics hook into this to log crashes automatically."
        }
      ]
    },
    {
      id: "int-system",
      title: "Mobile System Design & Scale",
      difficulty: "Lead / Senior",
      questions: [
        {
          q: "Describe the architecture of an offline-first chat application. How do you handle message synchronization and connection losses?",
          modelAnswer: "I would structure the local store (e.g. Drift or Isar) as the single source of truth. When a user sends a message, it is written to the database with a 'pending' state and rendered instantly. A background Sync Manager attempts to push the message via WebSockets or HTTP. If connection fails, it retries when connection is restored. Incoming messages are written to local DB, and the UI listens to query streams from the DB for updates."
        },
        {
          q: "How would you design a modular, package-based Flutter project structure in a monorepo for a large enterprise app?",
          modelAnswer: "I would establish a Monorepo using Melos. I'd split features into separate packages (e.g., `packages/features/auth`, `packages/features/dashboard`), core utilities (`packages/core/network`, `packages/core/design_system`), and a main application shell. Feature packages only depend on core packages, never on each other. If features must navigate or communicate, they use a mediator interface or dependency injection defined in a common contract package."
        }
      ]
    }
  ],
  cvTips: [
    {
      role: "Architecture & Scaling",
      before: "Created Flutter applications using BLoC and Clean Architecture.",
      after: "Designed a modular, feature-first monorepo architecture utilizing Melos, decoupling the application into 12 local packages; decreased build/test cycle times by 35% and enabled parallel development for 3 product squads."
    },
    {
      role: "Performance Optimization",
      before: "Optimized screens to reduce rebuilds and fixed UI lag.",
      after: "Led performance audits using Dart DevTools, reducing rendering jank by implementing RepaintBoundaries and resolving heap memory leaks; restored application target to 60/120 FPS on legacy Android devices."
    },
    {
      role: "Platform Integration",
      before: "Used method channels to access platform code for notifications.",
      after: "Implemented type-safe platform integrations using Pigeon code generation to bridge custom background tracking services in Swift and Kotlin, reducing channel-related production crashes to zero."
    },
    {
      role: "DevOps & CI/CD",
      before: "Setup GitHub Actions to build and test the app.",
      after: "Architected automated CI/CD pipelines with GitHub Actions and Fastlane Match; integrated Golden testing and automated releases to Google Play and Apple TestFlight, saving 5+ engineering hours per week."
    }
  ]
};
