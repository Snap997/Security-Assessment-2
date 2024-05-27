package it.unisa;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import java.util.HashMap;
import java.util.Map;

public class SanitizerWrapper {
    private final Map<String, String[]> sanitizedParams;

    public SanitizerWrapper(HttpServletRequest request) {
        sanitizedParams = new HashMap<>();
        sanitizeRequestParameters(request);
    }

    private void sanitizeRequestParameters(HttpServletRequest request) {
        Map<String, String[]> parameterMap = request.getParameterMap();

        for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
            String paramName = entry.getKey();
            String[] paramValues = entry.getValue();

            if (paramValues != null && paramValues.length > 0) {
                String[] sanitizedValues = new String[paramValues.length];
                for (int i = 0; i < paramValues.length; i++) {
                    sanitizedValues[i] = sanitize(paramValues[i]);
                }
                sanitizedParams.put(paramName, sanitizedValues);
            } else {
                sanitizedParams.put(paramName, new String[]{""});
            }
        }
    }

    private String sanitize(String input) {
        if (input == null) {
            return null;
        }
        return input.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll("\"", "&quot;")
                .replaceAll("'", "&#x27;")
                .replaceAll("/", "&#x2F;");
    }

    public String getParameter(String name) {
        String[] values = sanitizedParams.get(name);
        return (values != null && values.length > 0) ? values[0] : null;
    }

    public String[] getParameterValues(String name) {
        return sanitizedParams.get(name);
    }

    public Map<String, String[]> getParameterMap() {
        return sanitizedParams;
    }
}
