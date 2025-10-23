"use client";

import { buttonVariants } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { graphql } from "@/gql";
import { useDialogCloseConfirmation } from "@/hooks/use-dialog-close-confirmation";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { toast } from "sonner";
import { POINTS_TABLE_QUERY } from "./data-table";
import { UpdatePointsForm } from "./update-form";

const CREATE_POINT_MUTATION = graphql(`
  mutation CreatePoint($input: CreatePointInput!) {
    createPoint(input: $input) {
      id
    }
  }
`);

export function CreatePointTrigger() {
  const [open, setOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const {
    showConfirmation,
    handleDialogOpenChange,
    handleConfirmClose,
    handleCancelClose,
  } = useDialogCloseConfirmation({
    isDirty: isFormDirty,
    setOpen,
    onConfirmedClose: () => {
      setIsFormDirty(false);
    },
  });

  const handleFormStateChange = (isDirty: boolean) => {
    setIsFormDirty(isDirty);
  };

  const handleCompleted = () => {
    setIsFormDirty(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger className={buttonVariants()}>給予點數</DialogTrigger>
        <CreatePointDialogContent
          onCompleted={handleCompleted}
          onFormStateChange={handleFormStateChange}
        />
      </Dialog>

      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={() => {}}
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
      />
    </>
  );
}

function CreatePointDialogContent({
  onCompleted,
  onFormStateChange,
}: {
  onCompleted: () => void;
  onFormStateChange: (isDirty: boolean) => void;
}) {
  const [createPoint] = useMutation(CREATE_POINT_MUTATION, {
    refetchQueries: [POINTS_TABLE_QUERY],

    onError(error) {
      toast.error("給予點數失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("給予點數成功");
      onCompleted();
    },
  });

  const onSubmit = (formData: { userID: string; points: number; description?: string }) => {
    createPoint({
      variables: {
        input: {
          userID: formData.userID,
          points: formData.points,
          description: formData.description,
        },
      },
    });
  };

  return (
    <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>給予點數</DialogTitle>
        <DialogDescription>
          給一個使用者手動發放點數。
        </DialogDescription>
      </DialogHeader>
      <UpdatePointsForm
        defaultValues={{
          userID: "",
          points: 0,
          description: "",
        }}
        onSubmit={onSubmit}
        action="create"
        onFormStateChange={onFormStateChange}
      />
    </DialogContent>
  );
}
