import { Box, Button, Group, List, NativeSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signal } from "@preact/signals-react";
import type { BannerAd as Banner } from "admob-plus-cordova";

const banners = signal<Banner[]>([]);

let nextID = 0

function BannerAd() {
  const form = useForm({
    initialValues: {
      position: "Bottom",
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          banners.value = [
            new admob.BannerAd({
              id: `${++nextID}`,
              adUnitId: "ca-app-pub-3940256099942544/6300978111",
              position: values.position.toLowerCase() as never,
            }),
            ...banners.value,
          ];
        })}
      >
        <NativeSelect
          data={["Bottom", "Top"]}
          label="Position"
          {...form.getInputProps("position")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Add</Button>
        </Group>
      </form>
      <List>
        {banners.value.map((ad) => (
          <List.Item>
            {ad.id}{" "}
            <Button
              onClick={async () => {
                await ad.load().catch(alert);
              }}
            >
              Load
            </Button>
            <Button
              onClick={() => {
                ad.show().catch(alert);
              }}
            >
              Show
            </Button>
            <Button
              onClick={() => {
                ad.hide().catch(alert);
              }}
            >
              Hide
            </Button>
          </List.Item>
        ))}
      </List>
    </Box>
  );
}

export default BannerAd;
