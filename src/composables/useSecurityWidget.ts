import { createApp, onUnmounted, ref } from 'vue'
import SecurityWidget from '@/components/securityWidget.vue'


export default function useSecurityWidget() {



    const security = async (message:string,origin:string,requestLink:string) => {
        try {
            const existingWidget = document.querySelector("#securityWidgetContainer");
            if (existingWidget) {
                existingWidget.remove();
            }

            const tempDiv = document.createElement("div");
            tempDiv.id = "securityWidgetContainer"; // Ajoute un ID pour identification
            document.body.appendChild(tempDiv);

          const app = createApp({
            setup() {
              const widgetMessage = ref(message);
              const widgetOrigin = ref(origin);
              const widgetRequestLink = ref(requestLink);

              onUnmounted(() => {
                app.unmount();
                tempDiv.remove();
              });

              return { widgetMessage, widgetOrigin, widgetRequestLink };
            },
            template: `<SecurityWidget :message="widgetMessage" :originLink="widgetOrigin" :requestLink="widgetRequestLink" />`,
            components: { SecurityWidget }
          });

          app.mount(tempDiv);
        }catch (error) {
          console.log(error)
        }
    };

    return security;
}
