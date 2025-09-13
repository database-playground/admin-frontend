import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/lib/auth";
import buildUri from "@/lib/build-uri";

/**
 * GraphQL Proxy API Route
 * 
 * This route implements the Backend for Frontend (BFF) pattern for GraphQL requests.
 * It acts as a proxy between the frontend and the backend GraphQL API, automatically
 * adding the Authorization header with the user's access token.
 * 
 * This approach:
 * 1. Keeps the access token secure on the server side
 * 2. Allows both SSR and CSR to work with the same Apollo Client configuration
 * 3. Follows OAuth BFF best practices
 * 4. Reduces the complexity of token management in the frontend
 */

export async function POST(request: NextRequest) {
  try {
    // Get the auth token from the user's session
    const accessToken = await getAuthToken();
    
    if (!accessToken) {
      return NextResponse.json(
        { 
          errors: [{ 
            message: "Authentication required",
            extensions: { code: "UNAUTHORIZED" }
          }] 
        },
        { status: 401 }
      );
    }

    // Get the request body (GraphQL query/mutation)
    const body = await request.json();
    
    // Forward the request to the backend GraphQL API
    const backendUrl = buildUri("/query");
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    // Handle non-OK responses
    if (!response.ok) {
      console.error(`Backend GraphQL request failed: ${response.status} ${response.statusText}`);
      
      // Try to parse error response
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { 
          errors: [{ 
            message: "Backend server error",
            extensions: { code: "INTERNAL_ERROR" }
          }] 
        };
      }
      
      return NextResponse.json(errorData, { status: response.status });
    }

    // Forward the successful response
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("GraphQL proxy error:", error);
    
    return NextResponse.json(
      { 
        errors: [{ 
          message: "Internal server error",
          extensions: { code: "INTERNAL_ERROR" }
        }] 
      },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    { 
      errors: [{ 
        message: "GET method not supported. Use POST for GraphQL queries.",
        extensions: { code: "METHOD_NOT_ALLOWED" }
      }] 
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { 
      errors: [{ 
        message: "PUT method not supported. Use POST for GraphQL queries.",
        extensions: { code: "METHOD_NOT_ALLOWED" }
      }] 
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { 
      errors: [{ 
        message: "DELETE method not supported. Use POST for GraphQL queries.",
        extensions: { code: "METHOD_NOT_ALLOWED" }
      }] 
    },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { 
      errors: [{ 
        message: "PATCH method not supported. Use POST for GraphQL queries.",
        extensions: { code: "METHOD_NOT_ALLOWED" }
      }] 
    },
    { status: 405 }
  );
}
