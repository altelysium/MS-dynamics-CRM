<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "../stores/profileStore";
import { computed, onMounted, ref, watch } from "vue";
import type {
  ContactInfoKeys,
  HeaderData,
  KeyValueRow,
  PersonalDataKeys,
  InsuranceInfoKeys,
  AppointmentsKeys,
  Product,
  FeedbackKeys,
  Review,
  ActivitiesDataKeys,
} from "../types/profileTypes";
import ProfileCard from "../components/ProfileCard.vue";
import ProfileCardInfo from "../components/profileCardContent/ProfileCardInfo.vue";
import ProfileCardSheet from "../components/profileCardContent/ProfileCardSheet.vue";
import ProfileCardListComponent from "../components/profileCardContent/ProfileCardListComponent.vue";
import { Dialog } from "primevue";
import { type FormFieldState } from "@primevue/forms";
import type { User } from "../types/userTypes";
import ModalContent from "../components/ModalContent.vue";

const profileStore = useProfileStore();
const { selectedUserId, fetchedProfileData, fetchedProductsData, fetchedSingleProductData } =
  storeToRefs(profileStore);

let isModalVisible = ref<boolean>(false);
let modalTitle = ref<string>("");

const headerData = computed((): HeaderData => {
  return {
    imageSource: fetchedProfileData.value ? fetchedProfileData.value.image : "",
    fullName: `${fetchedProfileData.value?.firstName} ${fetchedProfileData.value?.lastName}`,
    department: fetchedProfileData.value ? fetchedProfileData.value.company.department : "",
  };
});

let contactInfoData = ref<Record<ContactInfoKeys, KeyValueRow>>({
  fullName: {
    key: "Full Name",
    value: "",
  },
  phone: {
    key: "Phone",
    value: "",
  },
  homePhone: {
    key: "Home Phone",
    value: "",
  },
  address: {
    key: "Address",
    value: "",
  },
  email: {
    key: "Email",
    value: "",
  },
},
);
const personalData = computed((): Record<PersonalDataKeys, KeyValueRow> => {
  return {
    gender: {
      key: "Gender",
      value: fetchedProfileData.value ? fetchedProfileData.value.gender.charAt(0).toUpperCase() + fetchedProfileData.value.gender.slice(1) : "",
    },
    birth: {
      key: "Birth (Age)",
      value: fetchedProfileData.value ? getAge(fetchedProfileData.value.birthDate) : "",
    },
    id: {
      key: "ID",
      value: fetchedProfileData.value ? String(fetchedProfileData.value?.id) : "",
    },
    nationality: {
      key: "Nationality",
      value: fetchedProfileData.value ? fetchedProfileData.value?.address.country : "",
    },
    materialStatus: {
      key: "Material Status",
      value: fetchedProfileData.value?.maidenName ? "Married" : "Not married",
    },
    emergencyContact: {
      key: "Emergency Contact",
      value: fetchedProfileData.value ? fetchedProfileData.value.bank.cardNumber : "",
    },
  };
});
const activitiesData = computed((): ActivitiesDataKeys[] => {
  const dataArray: ActivitiesDataKeys[] = [];
  fetchedProductsData.value?.products.forEach((item: Product) => {
    const date: string = item.meta.updatedAt.slice(0, 10);
    dataArray.push({
      title: item.title,
      description: item.brand ? `${item.brand}` : "Unbranded",
      date: date,
      category: item.category,
    });
  });
  return dataArray;
});
let insuranceInfoData = ref<Record<InsuranceInfoKeys, KeyValueRow>>({
  memberId: {
    key: "Member ID",
    value: fetchedProfileData.value ? fetchedProfileData.value.bank.cardNumber : "",
  },
  provider: {
    key: "Provider",
    value: fetchedProfileData.value ? fetchedProfileData.value.company.name : "",
  },
});
const appointmentsData = computed((): Record<AppointmentsKeys, string>[] => {
  const dataArray: Record<AppointmentsKeys, string>[] = [];
  fetchedProductsData.value?.products.forEach((item: Product) => {
    const date: string = `${item.meta.updatedAt.slice(0, 10).split("-").reverse().join("-")}${item.meta.updatedAt.slice(11, 16)} AM`;
    dataArray.push({
      date: date,
      speciality: item.category.charAt(0).toUpperCase() + item.category.slice(1),
      status: item.stock % 2 ? "Confirmed" : "Cancelled",
    });
  });
  return dataArray;
});
const feedbackData = computed((): Record<FeedbackKeys, string>[] => {
  const dataArray: Record<FeedbackKeys, string>[] = [];
  fetchedSingleProductData.value?.reviews.forEach((item: Review) => {
    const date: string = `${item.date.slice(0, 10).split("-").reverse().join("-")}`;
    dataArray.push({
      feedbackTitle: item.reviewerName,
      feedbackDate: date,
      feedbackStatus: String(item.rating),
    });
  });
  return dataArray;
});

const contactMethodData = ref([
  { contactMethod: "Email" },
  { contactMethod: "Mobile phone" },
  { contactMethod: "Mail" },
]);
watch(fetchedProfileData, (updatedData: User | null): void => {
  if (updatedData) {
    contactInfoData.value = {
      fullName: {
        key: "Full Name",
        value: `${updatedData.firstName} ${updatedData.lastName}`,
      },
      phone: {
        key: "Phone",
        value: updatedData.phone,
      },
      homePhone: {
        key: "Home Phone",
        value: "-",
      },
      address: {
        key: "Address",
        value: updatedData.address.address,
      },
      email: {
        key: "Email",
        value: updatedData.email,
      },
    };
    insuranceInfoData.value = {
      memberId: {
        key: "Member ID",
        value: updatedData.bank.cardNumber,
      },
      provider: {
        key: "Provider",
        value: updatedData.company.name,
      },
    };
  }
})

function getAge(dateString: string): string {
  const today = new Date();
  const birthDate = new Date(dateString);
  let date = dateString.split("-").map(part => part.length === 1 ? "0" + part : part).reverse().join("/");

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return `${date} (${age})`;
}

function getModalTitle(title: string): string {
  isModalVisible.value = true;
  modalTitle.value = title;
  return modalTitle.value;
}

function submitModal(formData: {
  register: (field: string, options: any) => any;
  reset: () => void;
  valid: boolean;
} & {
  [key: string]: FormFieldState;
}, oldData: Record<string, KeyValueRow>): Record<string, KeyValueRow> {
  isModalVisible.value = false;
  for (let prop in oldData) {
    if (oldData[prop]) {
      const key = oldData[prop].key;
      if (formData[key] && typeof formData[key].value === "string") {
        oldData[prop].value = formData[key].value
      }
    }
  }
  return oldData;
}

onMounted(() => {
  profileStore.getProfileData(selectedUserId.value);
  profileStore.getProducts();
  profileStore.getProductReviews(selectedUserId.value);
});
</script>

<template>
  <section class="user-page">
    <header class="user-header">
      <img class="user-header__img" :src="headerData.imageSource" :alt="headerData.fullName" />
      <div class="user-header-info">
        <p class="user-header-info__title">{{ headerData.fullName }}</p>
        <p class="user-header-info__description">{{ headerData.department }}</p>
      </div>
    </header>
    <div class="user-body">
      <ProfileCard title="Contact info" card-type="info" editable @set-modal-visible="getModalTitle">
        <ProfileCardInfo :data="contactInfoData" />
      </ProfileCard>
      <ProfileCard title="Personal" card-type="info">
        <ProfileCardInfo :data="personalData" />
      </ProfileCard>
      <ProfileCard title="Activities" card-type="info">
        <ProfileCardListComponent :data="activitiesData" />
      </ProfileCard>
      <ProfileCard title="Insurance info" card-type="info" editable @set-modal-visible="getModalTitle">
        <ProfileCardInfo :data="insuranceInfoData" />
      </ProfileCard>
      <ProfileCard title="Appointments" card-type="sheet">
        <ProfileCardSheet :data="appointmentsData" :columns="[
          { field: 'date', header: 'Start time' },
          { field: 'speciality', header: 'Speciality' },
          { field: 'status', header: 'Status' },
        ]" />
      </ProfileCard>
      <ProfileCard title="Feedback" card-type="sheet">
        <ProfileCardSheet :data="feedbackData" :columns="[
          { field: 'feedbackTitle', header: 'Case title' },
          { field: 'feedbackDate', header: 'Date' },
          { field: 'feedbackStatus', header: 'Status' },
        ]" />
      </ProfileCard>
      <ProfileCard title="Contact preferences" card-type="sheet">
        <ProfileCardSheet :data="contactMethodData" :columns="[{ field: 'contactMethod', header: 'Contact Method' }]" />
      </ProfileCard>
    </div>
    <Dialog v-model:visible="isModalVisible" modal style="width: 500px;">
      <template #header>
        <h3 class="modal__title">Edit {{ modalTitle.toLowerCase() }}</h3>
      </template>
      <ModalContent :data="modalTitle == 'Contact info' ? contactInfoData : insuranceInfoData" :title="modalTitle"
        @update-data="submitModal"></ModalContent>
    </Dialog>
  </section>
</template>

<style scoped>
.user-page {
  max-width: 1170px;
  box-shadow: 0px 4px 10px 0px #00000026;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0px -1px 0px 0px #44444f1a inset;
  padding: 35px 30px 10px 30px;
}

.user-header__img {
  height: 81px;
  width: 81px;
  border-radius: 50%;
}

.user-header-info__title {
  font: 600 16px/24px "Poppins";
  padding-bottom: 3px;
  color: #171725;
}

.user-header-info__description {
  font: 400 12px/12px "Poppins";
  color: #92929d;
}

.user-body {
  height: 1000px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  padding: 35px;
}

.modal__title {
  font: 500 24px/36px "Poppins";
  padding: 10px;
}
</style>
