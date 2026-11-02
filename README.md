PROJECT DNA

AI-Powered Engineering Component Discovery & Management Platform
1. Problem Statement

  Engineering students often find it difficult to locate the components they need for academic projects. They may not know which components are already available in the college, where those components are stored, whether they are currently available, or how they have been used before. As a result, students may spend unnecessary time searching for components or purchasing items that the college already owns.
Project DNA aims to solve this problem by giving every component a unique digital identity. The platform allows students to search for components, check their availability and storage location, view their usage history, and submit requests to borrow them. AI helps students identify suitable components for their project requirements and suggests available alternatives.


2. Project Objectives

i. Create a digital identity and record for every engineering component.
ii. Allow students to search for components by name, category or project requirement.
iii. Display component availability and storage location.
iv. Maintain the usage history of each component, including projects in which it has been used.
v. Allow students to submit and track component borrowing requests.
vi. Help students discover suitable components using AI-based recommendations.
vii. Suggest available alternatives when a requested component is unavailable.
viii. Encourage reuse of existing college resources and reduce unnecessary purchases.


3. Main Features

1. Digital Component Identity: Give every component a unique record containing its name, category, description and identifying details.
2. Component Search: Let students search and browse components by name, type or category.
3. Availability and Location: Show whether a component is available, borrowed or unavailable, along with its college storage location.
4. Usage History: Maintain a record of when a component was used, the project it was used for and relevant borrowing or return details.
5. Borrowing Requests: Allow students to request components and view the status of their requests.
6. AI Component Assistant: Understand a student's project requirements and recommend suitable components.
7. AI Alternative Suggestions: Recommend similar components that are currently available in the college.
8. Component Management: Allow authorized staff or administrators to add components, update their details, manage availability and maintain records.


4. Role of Artificial Intelligence

AI will act as a component recommendation assistant. Students can describe their project requirements, and the system can suggest components that may be suitable for the project.

i. Understand project requirements entered by students in natural language.
ii. Recommend components that match the required function or purpose.
iii. Suggest available alternatives when a particular component is unavailable.
iv. Prioritize reusable components that are already present in the college.
v. Help students compare component options and understand why a component may be suitable.

Hugging Face Transformers can be used to support language understanding and recommendation features. The exact model should be selected and tested based on the type of project descriptions and component information available. PyTorch can support model fine-tuning if required. OpenCV and Roboflow are relevant if image-based component identification is added as an additional feature.


5. Technology Stack

Area                  Technology	        Purpose in Project DNA
Frontend	            React.js	          Build the student and administrator interfaces.
Styling	              Tailwind CSS	      Create responsive layouts and reusable UI styles.
Backend	              Python + FastAPI	  Implement APIs, application logic and AI service integration.
Database	            PostgreSQL	        Store component records, digital identities, availability, usage history and borrowing requests.
AI models	            Hugging Face        Transformers	Understand project requirements and generate component recommendations.
Image processing	    OpenCV	            Support optional image-based component identification or image handling.
AI training	          PyTorch	            Fine-tune or evaluate AI models if required.
Image storage	        Supabase Storage	  Store component images and related visual files.
Dataset preparation	  Roboflow	          Prepare image datasets if image-based identification is implemented.
Payments	            Razorpay            Optional: handle deposits or fees if the college adopts a paid borrowing process.
Maps	                Google              Maps	Help students locate component storage rooms or designated collection points.
Deployment	          Vercel + Render	    Deploy the frontend and backend services.
Version control	      GitHub	            Collaborate on code and track project changes.


6. System Workflow

i) An administrator or authorized staff member adds a component to the platform and creates its digital record.
ii) The component record is assigned a unique identity and includes its details, category, image and storage location.
iii) The system displays the component's current availability and usage history.
iv) A student searches for a component or describes their project requirements to the AI assistant.
v) The platform displays suitable components available in the college and recommends alternatives when needed.
vi) The student views the component details, availability, location and previous usage information.
vii) The student submits a borrowing request through the platform.
viii) The authorized person reviews the request and updates its status. When the component is issued or returned, its availability and usage history are updated.


7. Database Requirements

The database will store the information needed to identify, locate and manage each component:

a) Student, staff and administrator details.
b) Unique component IDs, names, descriptions, categories and images.
c) Component storage locations and availability status.
d) Component usage history and associated project details.
e) Borrowing requests, approvals, issue dates and return dates.
f) AI recommendation inputs and relevant component matching information, where required.


8. Expected Outcome

Project DNA will provide a centralized platform where every engineering component in the college has its own digital identity. Students will be able to discover components, check their availability and location, view their usage history and request to borrow them.
With AI-powered recommendations, students can find components suited to their project requirements and discover available alternatives already owned by the college. The platform aims to improve resource utilization, encourage component reuse and reduce unnecessary purchases.


9. Project Objective Summary

Project DNA – Identify. Discover. Reuse.
An AI-powered college component management platform that gives every component a digital identity and helps students discover, track and borrow available resources.
