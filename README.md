# COCOMO Calculator

A modern, responsive web application for estimating software development effort and time using the **Constructive Cost Model (COCOMO)** developed by Barry Boehm.

## Features

- **Clean, Modern Interface**: Responsive design that works on desktop, tablet, and mobile devices
- **Real-time Calculations**: Instant results as you input project parameters
- **Three Project Types**: Support for Organic, Semi-detached, and Embedded projects
- **Comprehensive Results**: Shows effort, development time, team size, and productivity metrics
- **Formula Transparency**: Displays the actual COCOMO formulas used in calculations
- **Input Validation**: Ensures accurate calculations with proper error handling
- **Educational Content**: Includes detailed information about different project types

## COCOMO Model Overview

The COCOMO model estimates software development effort based on the size of the project (in thousands of lines of code) and the project type. It uses the following formulas:

### Basic COCOMO Equations

1. **Effort (E)**: `E = a × (KLOC)^b` (Person-Months)
2. **Development Time (D)**: `D = c × (E)^d` (Months)
3. **Team Size (P)**: `P = E / D` (People)
4. **Productivity**: `LOC / Person-Month`

### Project Type Constants

| Project Type | a | b | c | d | Description |
|-------------|---|---|---|---|-------------|
| **Organic** | 2.4 | 1.05 | 2.5 | 0.38 | Small teams, familiar environment, flexible requirements |
| **Semi-detached** | 3.0 | 1.12 | 2.5 | 0.35 | Medium teams, mixed experience, moderate constraints |
| **Embedded** | 3.6 | 1.20 | 2.5 | 0.32 | Large teams, tight constraints, complex requirements |

## Usage

1. **Enter Project Size**: Input the estimated size of your software project in thousands of lines of code (KLOC)
2. **Select Project Type**: Choose the type that best describes your project:
   - **Organic**: Simple projects like business applications, utilities
   - **Semi-detached**: Medium complexity projects like compilers, database systems
   - **Embedded**: Complex projects like operating systems, real-time systems
3. **Calculate**: Click the "Calculate Estimates" button to get your results
4. **Review Results**: Examine the estimated effort, development time, team size, and productivity

## Project Structure

```
cocomo-calculator/
├── index.html          # Main HTML file with user interface
├── style.css           # CSS styling for modern, responsive design
├── script.js           # JavaScript logic for COCOMO calculations
└── README.md           # This documentation file
```

## Technical Implementation

### HTML Structure
- Semantic HTML5 elements for accessibility
- Form inputs with proper validation attributes
- Responsive grid layout for results display

### CSS Features
- CSS Grid and Flexbox for responsive layouts
- CSS custom properties (variables) for consistent theming
- Smooth animations and transitions
- Mobile-first responsive design
- Print-friendly styles

### JavaScript Functionality
- ES6+ class-based architecture
- Real-time input validation
- Smooth animations for result display
- Error handling and user feedback
- Extensible design for future enhancements

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Example Calculations

### Small Organic Project (10 KLOC)
- **Effort**: 25.1 Person-Months
- **Development Time**: 7.9 Months
- **Team Size**: 3.2 People
- **Productivity**: 398 LOC/Person-Month

### Medium Semi-detached Project (50 KLOC)
- **Effort**: 178.3 Person-Months
- **Development Time**: 16.7 Months
- **Team Size**: 10.7 People
- **Productivity**: 280 LOC/Person-Month

### Large Embedded Project (200 KLOC)
- **Effort**: 1,216.0 Person-Months
- **Development Time**: 27.5 Months
- **Team Size**: 44.2 People
- **Productivity**: 165 LOC/Person-Month

## Limitations

- Based on the Basic COCOMO model (not Intermediate or Detailed)
- Estimates are for new development, not maintenance or enhancement
- Assumes average team experience and development environment
- Results should be used as initial estimates and refined with project-specific factors

## Future Enhancements

- [ ] Intermediate COCOMO with cost drivers
- [ ] Historical project data comparison
- [ ] Export results to PDF/Excel
- [ ] Multiple project comparison
- [ ] Risk assessment integration
- [ ] Agile development adjustments

## References

- Boehm, B. W. (1981). "Software Engineering Economics". Prentice-Hall.
- Boehm, B. W. et al. (2000). "Software Cost Estimation with COCOMO II". Prentice-Hall.

## License

This project is open source and available under the MIT License.

---

**Note**: This calculator provides estimates based on the COCOMO model. Actual project results may vary based on team experience, project complexity, requirements stability, and other factors not captured in the basic model.
