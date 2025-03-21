# Contributing to MLSC Studio Website

Thank you for your interest in contributing to the MLSC Studio Website! This document provides guidelines and instructions for contributing to this project.

<!-- 
This guide outlines the process and standards for contributing to the MLSC Studio Website project. It's designed to help new contributors get started quickly and ensure consistent quality across contributions.

Maintainers: Update this document when project standards or processes change.
Contributors: Read this document thoroughly before submitting your first pull request.
-->

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We aim to foster an inclusive and welcoming community.

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement:

1. Check if the issue already exists in the issue tracker
2. Create a new issue with a descriptive title and detailed description
3. Include steps to reproduce any bugs
4. Add relevant screenshots or error messages if applicable
5. Use labels appropriately to categorize the issue

### Development Workflow

1. **Fork the repository** to your GitHub account
2. **Clone your fork** to your local machine
3. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/issue-description
   ```
4. **Make your changes** following the coding standards
5. **Test your changes** thoroughly
6. **Commit your changes** with descriptive commit messages:
   ```bash
   git commit -m "Add: feature description"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request** against the main branch of the original repository

### Pull Request Guidelines

1. Include a clear description of the changes
2. Link any related issues using keywords like "Fixes #123" or "Resolves #123"
3. Make sure all tests pass and add new tests for new functionality
4. Keep pull requests focused on a single concern
5. Be responsive to feedback and be willing to make changes if requested

## Coding Standards

### General

- Follow consistent coding style
- Write clear, descriptive comments
- Use meaningful variable and function names
- Keep functions focused and small

### TypeScript

- Use TypeScript's static typing features
- Avoid using `any` type when possible
- Document complex functions with JSDoc comments
- Use interfaces for object shapes

### CSS

- Use descriptive class names
- Keep selectors simple and avoid deep nesting
- Group related styles together
- Consider responsive design in all styles

## Testing

- Write tests for new features
- Ensure all tests pass before submitting a pull request
- Consider edge cases in your tests

## Documentation

- Update documentation to reflect your changes
- Document new features and API changes
- Keep the README and other docs up to date

## Project Structure

Please maintain the existing project structure:

```
mlsc-website/
├── docs/                 # Documentation
├── public/               # Static assets
├── scripts/              # Helper scripts
├── src/                  # Source code
│   ├── middleware/       # Middleware functions
│   └── routes/           # Application routes
└── [root files]          # Configuration files
```

## Getting Help

If you need help or have questions:

1. Check the project documentation in the `/docs` directory
2. Create an issue with the "question" label
3. Reach out to the project maintainers

Thank you for contributing to the MLSC Studio Website project!