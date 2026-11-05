# World Sync — Agent Context & Architecture Guide

> [!CAUTION]
> **CRITICAL RULES FOR ALL AI AGENTS & TOOLS**:
> 1. **NEVER** run `git commit` or `git push` to GitHub or any remote repository for any of the user's projects. All version control operations (commit/push) are handled strictly by the user manually.
> 2. **NEVER** commit, push, or hardcode API keys, secrets, tokens, or credentials into source files. All keys must strictly reside in local `.env` files (which are `.gitignore`d) and referenced via environment variables. Provide only `.env.example` templates with empty placeholders.

## 1. Project Overview & Identity
- **App Name**: World Sync
- **Package ID / Bundle ID**: `com.kialabs.worldsync`
- **Framework**: Expo ~54 / React Native 0.76.5 + TypeScript + Three.js + React Three Fiber
- **Description**: Interactive 3D globe with live timezone data and solar/lunar position visualization.
